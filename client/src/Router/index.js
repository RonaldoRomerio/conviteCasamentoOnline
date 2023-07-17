import {BrowserRouter, Routes as Switch, Route} from 'react-router-dom';
import AuthRoute from './routes'
import Convite from '../Pages/Convite';
import Login from '../Pages/Login'
import Convidados from '../Pages/Convidados'
import Endereco from '../Pages/Endereco'
//pages

export default function Router(){
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path='/convite' element={<Convite/>} />
            <Route exact path='/Login' element={<Login/>} />
            <Route exact path='/Convidados' element={<Convidados/>} />
            <Route exact path='/Endereco' element={<Endereco/>} />
        </Switch>
    </BrowserRouter>
    )
}