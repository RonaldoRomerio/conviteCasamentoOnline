import { useRef, useState, useEffect, useContext } from 'react';
import PaginaBase from '../PaginaBase';
import { BsFillPlusCircleFill, BsWhatsapp, BsXCircle, BsFillPencilFill, BsFillPersonFill } from "react-icons/bs";
import { Table, Button } from 'reactstrap';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import { AuthContext } from '../../Context/AuthContext';
import useFirestoreHook from '../../customHooks/FirestoreHook'

export default function Convidados() {

  const {user} = useContext(AuthContext);
  const [abreModal, setAbreModal] = useState(false)
  const [lstConvidados, carregaDados, addDocumento, removeDocumento] = useFirestoreHook(`usuarios/${user.uid}/convidados`, 'convidado');
  
  useEffect(() => {
    carregaDados();
  },[]);
  function inserirConvidados(data, {reset}) {
        const infoconvidado = {
          "convidados": data.convidados,
          "telefone": data.telefone,
          "confirmacao": false
        }
        addDocumento(infoconvidado,reset);
  }
  function removerConvidado(id){
    removeDocumento(id);
  }
  function editarConvidado(id){
    
  }

  const formRef = useRef(null);
  const formRefEdicao = useRef(null);

  return (
    <PaginaBase>
        <div className='form'>
          <div className='tituloForm'><span><BsFillPlusCircleFill size={15} color={'#fff'} /> Adicionar convidados</span></div>
          <Form ref={formRef} onSubmit={inserirConvidados}>
            <div className='inputForm cl9' >
              <Input type="text" nome="convidados"  required></Input>
              <label>Nome dos convidados no convite</label>
            </div>
            <div className='inputForm cl2'>
              <Input type="text" nome="telefone" maxLength="11" required></Input>
              <label>Telefone para contato</label>
            </div>
            <div className='inputForm cl1'>
              <Button outline color="success"  className='buttonForm'>
                Salvar
              </Button>
            </div>
          </Form>
        </div>
        <div className='list'>
          <Table responsive hover>
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
                  Confirmação
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
                    <th data-label="#" scope="row">
                      {index}
                    </th>
                    <td data-label="Nome no convite">
                      {convidado.data.convidados}
                    </td>
                    <td data-label="Telefone">
                      {convidado.data.telefone}
                    </td>
                    <td data-label="Confirmação">
                      {convidado.data.confirmacao ? "Confirmado" : "Aguardando"}
                    </td>
                    <td data-label="Ações">
                      <div className='botaoLista'>
                      <button title="inserir convidados" onClick={() => {setAbreModal(true)}}><BsFillPersonFill color={"blue"} size={28}/></button>
                        <button title="editar convidado" onClick={() => {setAbreModal(true)}}><BsFillPencilFill color={"orange"} size={28}/></button>
                        <a href={`https://wa.me//55${convidado.data.telefone}?text=http://localhost:3000/convite/${user.uid}/${convidado.data.id}`} title="Enviar link do convite" target="_blank">
                          <button title="Enviar link do convite" ><BsWhatsapp color={'green'} size={28}/></button>
                        </a>
                        <button title="Excluir convidado" onClick={() => {removerConvidado(convidado.id)}}><BsXCircle color={"red"} size={28}/></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                      <td colSpan={4}> Não há convidados inseridos </td>
                  </tr>
              )}
            </tbody>
          </Table>
        </div>
    </PaginaBase>
  );
}