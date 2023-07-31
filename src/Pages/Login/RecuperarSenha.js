import React from 'react';
import './style.css'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import InputUnform from '../../components/Input';
import { AuthContext } from '../../Context/AuthContext';
export default function Login() {
    return (
        <div id='backgroundLogin'>
            <Form id='caixaLogin'>
                <p className='tituloLogin'>Entrar com usuário existente</p>
                <form>
                    <div className='inputLogin cl12'>
                        <InputUnform type="text" name="email" required></InputUnform>
                        <label>Email</label>
                    </div>
                    <Button color="success" outline className='buttonLogin'>Entrar</Button>
                </form>
            </Form>
        </div>
    );
}

//https://colorhunt.co/palette/f0ff4282cd4754b435379237