import { useState, useContext } from 'react';
import { db } from '../service/firebase';
import { addDoc, getDocs, deleteDoc, collection, doc } from 'firebase/firestore';
import { SwalContext } from '../Context/SwalContext';
export default function FirestoreHook(referencia, entidade) {
    const { swalConfirm, swalToast } = useContext(SwalContext);
    const [dados, setDados] = useState();

    const carregaDados = async () => {
        let arrayDoc = [];
        
        console.log(referencia.toString())
        try{
            const enderecos = await getDocs(collection(db, referencia.toString()));
            enderecos.forEach((doc) => {
                console.log(doc.data())
                    arrayDoc.push({
                        "id" : doc.id,
                        data: doc.data()
                    })
            });
            setDados(arrayDoc);
        } catch(e){
            swalToast('error', e);
            console.error("Error adding document: ", e);
        }
        
        
    }

const addDocumento = async (object, reset) => {
    try {
        const docRef = await addDoc(collection(db, referencia), object);
        console.log(docRef);
        setDados([{ "id": docRef.id,
                    "data": object}, 
                    ...dados]);
        swalToast('success', `${entidade} Inserido(a) com Sucesso`);
        reset();
    } catch (e) {
        swalToast('error', e);
        console.error("Error adding document: ", e);
    }
}
const removeDocumento = (id) => {
    try {
        swalConfirm(`Deseja realmente excluir esse(a) ${entidade}? Essa ação não é reversível`)
            .then(async (result) => {
                if (result.isConfirmed) {
                    await deleteDoc(doc(db,referencia, id));
                    setDados(dados.filter(c => c.id != id))
                } else {
                    return;
                }
            })
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

return [dados, carregaDados, addDocumento, removeDocumento];
}