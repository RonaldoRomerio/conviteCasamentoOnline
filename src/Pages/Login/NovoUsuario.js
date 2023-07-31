import React, { useContext, useRef } from 'react';
import './style.css'
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import InputUnform from '../../components/Input';
import { AuthContext } from '../../Context/AuthContext';
export default function Login() {

    const {criarUsuario} = useContext(AuthContext)
    const formRef = useRef(null);

    
    function criarNovoUsuario(data){
        criarUsuario(data.email, data.senha);
    }


    return (
        <div id='backgroundLogin'>
            <div id='caixaLogin'>
                <p className='tituloLogin'>Cadastrar novo usuário</p>
                <Form ref={formRef} onSubmit={criarNovoUsuario}>
                    <div className='inputLogin cl12'>
                        <InputUnform type="text" nome="email" required></InputUnform>
                        <label>Email</label>
                    </div>
                    <div className='inputLogin cl12'>
                        <InputUnform type="password" nome="senha" required></InputUnform>
                        <label>senha</label>
                    </div>
                    <Button type='submit' color="success" outline className='buttonLogin'>Cadastrar</Button>
                </Form>
            </div>
        </div>
    );
}
