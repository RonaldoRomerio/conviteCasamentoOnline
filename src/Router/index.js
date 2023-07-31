import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import AuthRoute from './routes'
import Convite from '../Pages/Convite';
import Login from '../Pages/Login'
import NovoLogin from '../Pages/Login/NovoUsuario'
import RecuperarLogin from '../Pages/Login/RecuperarSenha'
import Convidados from '../Pages/Convidados'
import Endereco from '../Pages/Endereco'
import Datas from '../Pages/Datas'
import Galeria from '../Pages/Galeria'
import SwalProviderContext from '../Context/SwalContext';
import AuthProviderContext from '../Context/AuthContext';
import Dashboard from '../Pages/Dashboard';
//pages

export default function Router() {
    return (
        <BrowserRouter>
            <SwalProviderContext>
                <AuthProviderContext>
                    <Switch>
                        <Route exact path='/convite/*' element={<Convite />} />
                        <Route exact path='/novoLogin' element={<NovoLogin />} />
                        <Route exact path='/recuperarLogin' element={<RecuperarLogin />} />
                        <Route exact path='/*' element={<AuthRoute component={<Convidados />} />} />
                        <Route exact path='/Endereco' element={<AuthRoute component={<Endereco />} />} />
                        <Route exact path='/datas' element={<AuthRoute component={<Datas />} />} />
                        <Route exact path='/galeria' element={<AuthRoute component={<Galeria />} />} />
                        <Route exact path='/dashboard' element={<AuthRoute component={<Dashboard />} />} />
                    </Switch>'
                </AuthProviderContext>
            </SwalProviderContext>
        </BrowserRouter>
    )
}