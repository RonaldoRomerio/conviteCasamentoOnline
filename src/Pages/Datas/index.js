import { useEffect, useRef, useContext, useState } from 'react';
import NavBar from '../../components/NavBar';
import { BsFillCalendarEventFill, BsXCircle } from "react-icons/bs";
import { Form } from '@unform/web';
import { db } from '../../service/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Input from '../../components/Input'
import { AuthContext } from '../../Context/AuthContext';
import { SwalContext } from '../../Context/SwalContext';
import { Table, Button } from 'reactstrap';
export default function Endereco() {

    const { user } = useContext(AuthContext);
    const { swalAlert, swalToast } = useContext(SwalContext);

    const [lstDatas, setLstDatas] = useState([]);

    useEffect(() => {
        async function recuperarDatas() {

            let arrayDoc = [];

            const datas = await getDocs(collection(db, "usuarios", user.uid, "datas"));
            datas.forEach((doc) => {
                console.log(doc);
                arrayDoc.push({
                    "id": doc.id,
                    "nomeEvento": doc.data().nomeEvento,
                    "dataEvento": doc.data().dataEvento,
                    "horaEvento": doc.data().horaEvento
                })
            });
            setLstDatas(arrayDoc);
        }
        recuperarDatas();
    }, [])


    async function inserirDatas(data, reset) {
        try {
            const docRef = await addDoc(collection(db, "usuarios", user.uid, "datas"), {
                "nomeEvento": data.nomeEvento,
                "dataEvento": data.dataEvento,
                "horaEvento": data.horaEvento,
            });
            setLstDatas([{
                "id": docRef.id,
                "nomeEvento": data.nomeEvento,
                "dataEvento": data.dataEvento,
                "horaEvento": data.horaEvento
            }, ...lstDatas])
            reset();
            swalToast('success', 'datas Inseridas com Sucesso');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function deletarDatas(id) {
        try {
            await deleteDoc(doc(db, "usuarios", user.uid, "datas", id));
            setLstDatas(lstDatas.filter(d => d.id != id))
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
                    <div className='tituloForm'><span><BsFillCalendarEventFill size={15} color={'#fff'} /> Adicionar Datas</span></div>
                    <Form ref={formRef} onSubmit={inserirDatas}>
                        <div className='inputForm cl7' >
                            <Input nome="nomeEvento" required></Input>
                            <label>Evento</label>
                        </div>
                        <div className='inputForm cl2' >
                            <Input nome="dataEvento" type="date" required></Input>
                        </div>
                        <div className='inputForm cl2' >
                            <Input nome="horaEvento" type="time" required></Input>
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
                                    Nome do Evento
                                </th>
                                <th>
                                    data
                                </th>
                                <th>
                                    hora
                                </th>
                                <th>
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lstDatas != null && lstDatas.length > 0 ?
                                lstDatas.map((data, index) => (
                                    <tr key={data.id}>
                                        <th data-label="#" scope="row">
                                            {index}
                                        </th>
                                        <td data-label="Nome do evento">
                                            {data.nomeEvento}
                                        </td>
                                        <td data-label="data">
                                            {data.dataEvento}
                                        </td>
                                        <td data-label="Hora">
                                            {data.horaEvento}
                                        </td>
                                        <td data-label="Ações">
                                            <div className='botaoLista'>
                                                <button onClick={() => deletarDatas(data.id)}><BsXCircle color={"red"} size={28} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4}> Não há eventos inseridos </td>
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