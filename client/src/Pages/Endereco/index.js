import {useEffect, useRef} from 'react';
import NavBar from '../../components/NavBar';
import { BsFillPinMapFill } from "react-icons/bs";
import { Button } from 'reactstrap';
import { Form } from '@unform/web';
import { db } from '../../service/firebase';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Input from '../../components/Input'
export default function Endereco() {

    useEffect(() =>{
        async function recuperarEndereco(){
            const enderecos = await getDocs(collection(db, "endereco"));
            enderecos.forEach((doc) => {
                console.log(doc.id);
                formRef.current.setData({ 
                    "id": doc.id,
                    "enderecoCerimonia": doc.data().enderecoCerimonia,
                    "enderecoSalaoFesta": doc.data().enderecoSalaoFesta
                });
            });
        }
        recuperarEndereco();
    },[])
    

    async function inserirEndereco(data, reset){
        try {
            deletarEnderecos(data.id);
            const docRef = await addDoc(collection(db, "endereco"), {
                "enderecoCerimonia": data.enderecoCerimonia,
                "enderecoSalaoFesta": data.enderecoSalaoFesta
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    async function deletarEnderecos(id){
        try{
            await deleteDoc(doc(db, "endereco", id));
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
                    <div className='tituloForm'><span><BsFillPinMapFill size={15} color={'#fff'} /> Adicionar Local</span></div>
                    <Form ref={formRef} onSubmit={inserirEndereco}>
                        <Input type="hidden" nome="id"/>
                        <div className='inputForm cl10' >
                            <Input nome="enderecoCerimonia" type="text" name="login" required></Input>
                            <label>Link do local da cerimônia</label>
                        </div>
                        <div className='inputForm cl9' >
                            <Input nome="enderecoSalaoFesta" type="text" name="login" required></Input>
                            <label>Link do local do salão de festas</label>
                        </div>
                        <div className='inputForm cl1'>
                            <Button color="primary"  className='buttonForm'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}