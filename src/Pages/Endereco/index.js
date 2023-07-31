import { useEffect, useRef, useContext, useState } from 'react';
import NavBar from '../../components/NavBar';
import { BsFillPinMapFill, BsXCircle } from "react-icons/bs";
import { Button, Table } from 'reactstrap';
import { Form } from '@unform/web';
import { db } from '../../service/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Input from '../../components/Input'
import { AuthContext } from '../../Context/AuthContext';
import { SwalContext } from '../../Context/SwalContext';
export default function Endereco() {

    const { user } = useContext(AuthContext);
    const { swalAlert, swalToast } = useContext(SwalContext);

    const [lstEnderecos, setlstEnderecos] = useState([]);

    useEffect(() => {
        async function recuperarEndereco() {

            let arrayDoc = [];

            const enderecos = await getDocs(collection(db, "usuarios", user.uid, "endereco"));
            enderecos.forEach((doc) => {
                arrayDoc.push({
                    "id": doc.id,
                    "nomeLocal": doc.data().nomeLocal,
                    "urlEndereco": doc.data().urlEndereco
                })
            });
            setlstEnderecos(arrayDoc);
        }
        recuperarEndereco();
    }, [])


    async function inserirEndereco(data, reset) {
        try {
            const docRef = await addDoc(collection(db, "usuarios", user.uid, "endereco"), {
                "nomeLocal": data.nomeLocal,
                "urlEndereco": data.urlEndereco
            });
            setlstEnderecos([{
                "id": docRef.id,
                "nomeLocal": data.nomeLocal,
                "urlEndereco": data.urlEndereco
            }, ...lstEnderecos])
            reset()
            swalToast('success', 'endereço Inserido com Sucesso');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function deletarEnderecos(id) {
        try {
            await deleteDoc(doc(db, "usuarios", user.uid, "endereco", id));
            setlstEnderecos(lstEnderecos.filter(e => e.id != id))
        } catch (e) {
            console.error("Error adding document: ", e)
        }

    }
    const formRef = useRef(null);

    return (
        <div>
            <NavBar />
            <div className="content">
                <div className='form'>
                    <div className='tituloForm'><span><BsFillPinMapFill size={15} color={'#fff'} /> Adicionar Local</span></div>
                    <Form ref={formRef} onSubmit={inserirEndereco}>
                        <Input type="hidden" nome="id" />
                        <div className='inputForm cl5' >
                            <Input nome="nomeLocal" required></Input>
                            <label>Nome do local</label>
                        </div>
                        <div className='inputForm cl6' >
                            <Input nome="urlEndereco" type="url"></Input>
                            <label>Link do maps</label>
                        </div>
                        <div className='inputForm cl1'>
                            <Button color="light" className='buttonForm'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='list'>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Nome do local
                                </th>
                                <th>
                                    Link do maps
                                </th>
                                <th>
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lstEnderecos != null && lstEnderecos.length > 0 ?
                                lstEnderecos.map((endereco, index) => (
                                    <tr key={endereco.id}>
                                        <th data-label="#" scope="row">
                                            {index}
                                        </th>
                                        <td data-label="Nome do local">
                                            {endereco.nomeLocal}
                                        </td>
                                        <td data-label="link do maps">
                                            <a className='linkMaps' href={endereco.urlEndereco} target="_blank">Clique aqui para ver o local</a>
                                        </td>
                                        <td data-label="Ações">
                                            <div className='botaoLista'>
                                                <button onClick={() => deletarEnderecos(endereco.id)}><BsXCircle color={"red"} size={28} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4}> Não há enderecos inseridos </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
