import {BrowserRouter, Routes as Switch, Route} from 'react-router-dom';
import AuthRoute from './routes'
import Convite from '../Pages/Convite';
import Login from '../Pages/Login'
import Convidados from '../Pages/Convidados'
//pages

export default function Router(){
    return(
    <BrowserRouter>
        <Switch>
            <Route exact path='/convite' element={<Convite/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/Convidados' element={<Convidados/>} />
        </Switch>
    </BrowserRouter>
    )
}