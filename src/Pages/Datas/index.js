import { useEffect, useRef, useContext, useState } from 'react';
import NavBar from '../../components/NavBar';
import { BsFillCalendarEventFill, BsXCircle } from "react-icons/bs";
import { Form } from '@unform/web';
import Input from '../../components/Input'
import { AuthContext } from '../../Context/AuthContext';
import { Table, Button } from 'reactstrap';
import useFirestoreHook from '../../util/FirestoreHook';
export default function Endereco() {

    const { user } = useContext(AuthContext);
    const [lstDatas, carregaDados, addDocumento, removeDocumento] = useFirestoreHook(`usuarios/${user.uid}/datas`);

    useEffect(() => {
        carregaDados()
    }, [])
    async function inserirDatas(data, {reset}) {
        let infoData = {
            "nomeEvento": data.nomeEvento,
            "dataEvento": data.dataEvento,
            "horaEvento": data.horaEvento,
        };
        addDocumento(infoData, reset);
    }

    async function deletarDatas(id) {
        removeDocumento(id);
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
                                            {data.data.nomeEvento}
                                        </td>
                                        <td data-label="data">
                                            {data.data.dataEvento}
                                        </td>
                                        <td data-label="Hora">
                                            {data.data.horaEvento}
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