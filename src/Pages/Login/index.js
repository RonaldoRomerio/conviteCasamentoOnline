import {useContext, useRef} from 'react';
import './style.css'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import InputUnform from '../../components/Input';
import { AuthContext } from '../../Context/AuthContext';
export default function Login() {
    
    const {login} = useContext(AuthContext)
    const formRef = useRef(null);
    
    function acessarComEmailESenha(data){
        login(data.email, data.senha);
    }
    return (
        <div id='backgroundLogin'>
            <div id='caixaLogin'>
                <p className='tituloLogin'>Entrar com usuário existente</p>
                <Form ref={formRef} onSubmit={acessarComEmailESenha}>
                    <div className='inputLogin cl12'>
                        <InputUnform type="email" nome="email" required></InputUnform>
                        <label>Email</label>
                    </div>
                    <div className='inputLogin cl12'>
                        <InputUnform type="password" nome="senha" required></InputUnform>
                        <label>senha</label>
                    </div>
                    <Button color="success" outline className='buttonLogin'>
                        Entrar
                    </Button>
                </Form>
                <div className='linhaEspaco'></div>
                <Link to={'/novoLogin'} className='linkLogin'>Criar novo usuário</Link>
                <Link to={'/recuperarLogin'} className='linkLogin'>esqueci minha senha</Link>
            </div>
        </div>
    );
}

//https://colorhunt.co/palette/f0ff4282cd4754b435379237