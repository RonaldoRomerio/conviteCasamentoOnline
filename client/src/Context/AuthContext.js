import React, {createContext, useState, useEffect, useLayoutEffect, useContext} from 'react';
import { SwalContext } from './SwalContext';

export const AuthContext = createContext({});

export default function AuthProviderContext({children}){

    const {swalAlert, swalToast} = useContext(SwalContext);

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useLayoutEffect(() => {
        function LoadStorage(){
            const storageUser = sessionStorage.getItem('user');
            const StorageToken = sessionStorage.getItem('token');
            if(storageUser){
                setUser(JSON.parse(storageUser));
            }}
        LoadStorage();
    },[])

    async function login(email, senha){
        
    }

    async function logout(){
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        setUser = null
    }
    return(
        <AuthContext.Provider value={{signed: !!user, user, loadingAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}