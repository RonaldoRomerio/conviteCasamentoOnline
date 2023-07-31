import { useRef, useState, useEffect, useContext } from 'react';
import NavBar from '../../components/NavBar';
import './style.css';
import { BsFillPlusCircleFill, BsWhatsapp, BsXCircle } from "react-icons/bs";
import { Table, Button } from 'reactstrap';
import { db } from '../../service/firebase';
import {doc, setDoc } from 'firebase/firestore';
import Input from '../../components/Input'
import { Form } from '@unform/web';
import { AuthContext } from '../../Context/AuthContext';
import { SwalContext } from '../../Context/SwalContext';

export default function Dashboard() {

    const { user } = useContext(AuthContext);
    const { swalConfirm, swalToast } = useContext(SwalContext);

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

        }
        recuperarDadosDaDashboard();
    }, [])

    const formRef = useRef(null);

    return (
        <div>
            <NavBar />
            <div className="content">
                <div className='form'>
                    <Form ref={formRef} onSubmit={salvarNomeCasal}>
                        <div className='inputForm cl10' >
                            <Input type="text" nome="convidados" required></Input>
                            <label>Nome do casal para o convite</label>
                        </div>
                        <div className='inputForm cl2'>
                            <Button color="light" className='buttonForm'>
                                Salvar
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}