import React from 'react';
import './style.css'
import { Button } from 'reactstrap';
export default function Login() {
    return (
        <div id='backgroundLogin'>
            <div id='caixaLogin'>
                <form>
                    <div className='inputLogin cl10'>
                        <input type="text" name="login" required></input>
                        <label>Login</label>
                    </div>
                    <div className='inputLogin cl10'>
                        <input type="password" name="senha" required></input>
                        <label>senha</label>
                    </div>
                </form>
                <Button color="success" outline className='buttonLogin'>
                    Entrar
                </Button>
            </div>
        </div>
    );
}

//https://colorhunt.co/palette/f0ff4282cd4754b435379237