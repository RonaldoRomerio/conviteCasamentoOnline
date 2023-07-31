import { useEffect, useRef, useState, useContext } from 'react';
import NavBar from '../../components/NavBar';
import './style.css'
import { storage, db } from '../../service/firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { addDoc, collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import "./style.css"
import { BsXCircle } from "react-icons/bs";
import { AuthContext } from '../../Context/AuthContext';
import { SwalContext } from '../../Context/SwalContext';
export default function Galeria() {

    const {user} = useContext(AuthContext);
    const { swalToast } = useContext(SwalContext);

    const fileInputRef = useRef(null);
    const [lstFotos, setLstFotos] = useState([]);

    const BuscarFoto = () => {
        fileInputRef.current.click();
    };

    const CapturarFoto = (e) => {
        const file = e.target.files[0];
        if (file && file.type.includes('image')) {
            inserirFotoNoStorage(file);
            swalToast('success', 'foto Inserida com Sucesso');
        } else {
            console.log('Por favor, selecione um arquivo de imagem.');
        }
    };

    async function inserirFotoNoStorage(file) {
        let data = new Date();
        let extensao = file.type.split("/")[1];
        let nomeArquivo = file.name.split(".")[0];
        const dataArquivo = data.getDate().toString() + data.getMonth().toString() + data.getFullYear().toString()
            + data.getHours().toString() + data.getMinutes().toString() + data.getMilliseconds().toString();
        const nomeCompleto = nomeArquivo + dataArquivo;
        const imagesRef = ref(storage, `usuarios/${user.uid}/fotos/${nomeCompleto + "." + extensao}`);
        try {
            uploadBytes(imagesRef, file).then((snapshot) => {
                getDownloadURL(imagesRef).then((url) => {
                    salvarLinkNaBase(url, nomeCompleto, extensao);
                })
            });
        } catch (e) {

        }
    }
    async function salvarLinkNaBase(url, nome, extensao) {
        try {
            const docRef = await addDoc(collection(db, "usuarios", user.uid, "fotosGaleria"), {
                "nome": nome,
                "url": url,
                "extensao": extensao
            });
            setLstFotos([{
                "id" : docRef.id,
                "url": url,
                "nome": nome,
                "extensao": extensao
            },...lstFotos])
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    useEffect(() =>{
        async function recuperarFotos(){
            let arrayDoc = [];
            const fotosGaleria = await getDocs(collection(db, "usuarios", user.uid, "fotosGaleria"));
            fotosGaleria.forEach((doc) => {
                console.log(doc);
                arrayDoc.push({
                    "id" : doc.id,
                    "url" : doc.data().url,
                    "nome": doc.data().nome,
                    "extensao":  doc.data().extensao
                })
            });
            setLstFotos(arrayDoc);
        }
        recuperarFotos();
    },[])

    function removerFoto(id){
        const dadosArquivo = lstFotos.filter(c => c.id == id)[0];

        deleteObject(ref(storage, `usuarios/${user.uid}/fotos/${dadosArquivo.nome}.${dadosArquivo.extensao}`))
        .then(async () => {
            await deleteDoc(doc(db, "usuarios", user.uid, "fotosGaleria", id));
            setLstFotos(lstFotos.filter(c => c.id != id))
            swalToast('success', 'foto removida com Sucesso');
        }).catch((error) => {
            swalToast('error', error.message);
        });
    }
    return (
        <div>
            <NavBar />
            <div className="content">
                <div id='galeriaFotos'>
                {lstFotos != null && lstFotos.length > 0 ?
                lstFotos.map((foto, index) => (
                    <div key={foto.id}>
                        <div className='opcoesFoto'>
                            <BsXCircle size={20} color='red' onClick={() => removerFoto(foto.id)}/>
                        </div>
                        <img src={foto.url} id={foto.id}/>
                    </div>
                        )):("")
                }
                </div>
            </div>
            <div className="fab-container">
                    <input
                        type="file"
                        accept="image/*"
                        className="fab-input"
                        ref={fileInputRef}
                        onChange={CapturarFoto}
                    />
                    <button className="fab-button" onClick={BuscarFoto}>+</button>
                </div>
        </div>
    );
}
