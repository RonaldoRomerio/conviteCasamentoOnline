import { useRef, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import './style.css';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import { db } from '../../service/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Input from '../../components/Input'
import { Form } from '@unform/web';
export default function Convidados() {

  const [lstConvidados, setLstConvidados] = useState([]);

  async function inserirConvidados(data, {reset}) {
    try {
      const docRef = await addDoc(collection(db, "convidados"), {
        "convidados": data.convidados,
        "telefone": data.telefone
      });
      reset();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    async function recuperarConvidados() {
      const enderecos = await getDocs(collection(db, "convidados"));
      enderecos.forEach((doc) => {
        console.log(doc);
      });
    }
    recuperarConvidados();
  }, [])

  const formRef = useRef(null);

  return (
    <div>
      <NavBar />
      <div className="content">
        <div className='form'>
          <div className='tituloForm'><span><BsFillPlusCircleFill size={15} color={'#fff'} /> Adicionar convidados</span></div>
          <Form ref={formRef} onSubmit={inserirConvidados}>
            <div className='inputForm cl6' >
              <Input type="text" nome="convidados" required></Input>
              <label>Nome dos convidados no convite</label>
            </div>
            <div className='inputForm cl3'>
              <Input type="text" nome="telefone" required></Input>
              <label>Telefone para contato</label>
            </div>
            <div className='inputForm cl1'>
              <Button color="primary" className='buttonForm'>
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
                  Nome no convite
                </th>
                <th>
                  Telefone
                </th>
                <th>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {lstConvidados != null && lstConvidados.length > 0 ?
                lstConvidados.map((convidado, index) => (
                  <tr key = {convidado.id}>
                    <th scope="row">
                      {index}
                    </th>
                    <td>
                      {convidado.convidados}
                    </td>
                    <td>
                      {convidado.telefone}
                    </td>
                    <td>
                      Botão botão botão
                    </td>
                  </tr>
                )) : (
                  <tr>
                      <td colSpan={4}> Não há convidados inseridos </td>
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