import { useRef, useState, useEffect, useContext } from 'react';
import PaginaBase from '../PaginaBase';
import { BsFillPlusCircleFill, BsWhatsapp, BsXCircle } from "react-icons/bs";
import { Table, Button } from 'reactstrap';
import { db } from '../../service/firebase';
import {doc, setDoc, getDoc } from 'firebase/firestore';
import Input from '../../components/Input'
import { Form } from '@unform/web';
import { AuthContext } from '../../Context/AuthContext';
import { SwalContext } from '../../Context/SwalContext';

export default function Configuracao() {

    const { user } = useContext(AuthContext);
    const { swalConfirm, swalToast } = useContext(SwalContext);
    
    const formRef = useRef(null);

    async function salvarNomeCasal(data, { reset }) {
        try {
            const docRef = await setDoc(doc(db, "usuarios", user.uid), {
                "nomeCasal": data.nomeCasal,
            });
            swalToast('success', 'nome salvo com Sucesso');
        } catch (e) {
            swalToast('error', e);
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {
        async function recuperarDadosDaDashboard() {
            const convidadosBusca = await getDoc(doc(db, "usuarios",  user.uid));
            formRef.current.setData(convidadosBusca.data());
        }
        recuperarDadosDaDashboard();
    }, [])


    return (
        <PaginaBase>
                <div className='form'>
                    <Form ref={formRef} onSubmit={salvarNomeCasal}>
                        <div className='inputForm cl10' >
                            <Input type="text" nome="nomeCasal" required></Input>
                            <label>Nome do casal para o convite</label>
                        </div>
                        <div className='inputForm cl2'>
                            <Button color="light" className='buttonForm'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
        </PaginaBase>
    );
}