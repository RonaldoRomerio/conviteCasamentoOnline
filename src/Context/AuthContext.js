import React, { createContext, useState, useEffect, useLayoutEffect, useContext } from 'react';
import { SwalContext } from './SwalContext';
import { db, auth } from '../service/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

export const AuthContext = createContext({});

export default function AuthProviderContext({ children }) {

    const { swalAlert, swalToast } = useContext(SwalContext);

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    
    const navigate = useNavigate();
    useEffect(() => {
        function LoadStorage() {
            const storageUser = sessionStorage.getItem('user');
            const StorageToken = sessionStorage.getItem('token');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }
        LoadStorage();
    }, [])

    async function login(email, senha) {
        await signInWithEmailAndPassword(auth, email, md5(senha))
            .then((userCredential) => {
                const token = userCredential.user.acessToken;
                const userInfo = userCredential.user;
                inserirDadosDeUsuarioLogado(userInfo, token)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swalToast('error', error.message);
            });
    }
    async function criarUsuario(email, senha) {
        await createUserWithEmailAndPassword(auth, email, md5(senha))
            .then(async (userCredential) => {
                const token = userCredential.user.acessToken;
                const userInfo = userCredential.user;
                console.log(userInfo);
                inserirDadosDeUsuarioLogado(userInfo, token);
                swalToast('success', 'cadastro realizado com sucesso');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
            return navigate("/convidados")
    }
    async function inserirDadosDeUsuarioLogado(user, token){
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        setUser(user)
    }
    async function logout() {
        signOut(auth).then(() => {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            setUser(null)
        }).catch((error) => {
            // An error happened.
        });

    }
    return (
        <AuthContext.Provider value={{ signed: !!user, user, loadingAuth, criarUsuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}