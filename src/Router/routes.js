import { useContext } from 'react';
import {Route, Navigate} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

//components
import Login from '../Pages/Login';

export default function AuthRoute({component: Component}){

    const{signed} = useContext(AuthContext);

    if(!signed)
        return <Login/>
    if(signed)
        return Component
}