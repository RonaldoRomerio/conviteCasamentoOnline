import { useRef, useState, useEffect, useContext } from 'react';
import NavBar from '../../components/NavBar';
import './style.css';
import { BsFillPlusCircleFill, BsWhatsapp, BsXCircle } from "react-icons/bs";
import { Table, Button } from 'reactstrap';
import { db } from '../../service/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Input from '../../components/Input'
import { Form } from '@unform/web';
import { AuthContext } from '../../Context/AuthContext';
import { SwalContext } from '../../Context/SwalContext';

export default function Convidados() {

  const {user} = useContext(AuthContext);
  const { swalConfirm, swalToast } = useContext(SwalContext);

  const [lstConvidados, setLstConvidados] = useState([]);

  async function inserirConvidados(data, {reset}) {
    try {
      const docRef = await addDoc(collection(db, "usuarios", user.uid, "convidados"), {
        "convidados": data.convidados,
        "telefone": data.telefone
      });
      setLstConvidados([{
        "id" : docRef.id,
        "convidados": data.convidados,
        "telefone": data.telefone
      },...lstConvidados])
      reset();
      swalToast('success', 'convidados Inseridos com Sucesso');
    } catch (e) {
      swalToast('error', e);
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    async function recuperarConvidados() {

      let arrayDoc = [];
      
      const enderecos = await getDocs(collection(db, "usuarios", user.uid, "convidados"));
      enderecos.forEach((doc) => {
        arrayDoc.push({
          "id" : doc.id,
          "convidados" : doc.data().convidados,
          "telefone" : doc.data().telefone
        })
      });
      setLstConvidados(arrayDoc)
    }
    recuperarConvidados();
  }, [])

  function removerConvidado(id){
    try{
      swalConfirm("Deseja realmente excluir esses convidados? Essa ação não é reversível")
      .then(async (result) => {
          if (result.isConfirmed) {
            await deleteDoc(doc(db, "usuarios", user.uid, "convidados", id));
            setLstConvidados(lstConvidados.filter(c => c.id != id))
          } else{
            return;
          }
      })
    }catch (e) {
        console.error("Error adding document: ", e)
    }
  }

  const formRef = useRef(null);

  return (
    <div>
      <NavBar />
      <div className="content">
        <div className='form'>
          <div className='tituloForm'><span><BsFillPlusCircleFill size={15} color={'#fff'} /> Adicionar convidados</span></div>
          <Form ref={formRef} onSubmit={inserirConvidados}>
            <div className='inputForm cl9' >
              <Input type="text" nome="convidados" required></Input>
              <label>Nome dos convidados no convite</label>
            </div>
            <div className='inputForm cl2'>
              <Input type="text" nome="telefone" required></Input>
              <label>Telefone para contato</label>
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
                    <th data-label="#" scope="row">
                      {index}
                    </th>
                    <td data-label="Nome no convite">
                      {convidado.convidados}
                    </td>
                    <td data-label="Telefone">
                      {convidado.telefone}
                    </td>
                    <td data-label="Ações">
                      <div className='botaoLista'>
                        <a href={`https://wa.me//55${convidado.telefone}?text=http://localhost:3000/convite/${user.uid}/${convidado.id}`} target="_blank">
                          <button><BsWhatsapp color={'green'} size={28}/></button>
                        </a>
                        <button onClick={() => removerConvidado(convidado.id)}><BsXCircle color={"red"} size={28}/></button>
                      </div>
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