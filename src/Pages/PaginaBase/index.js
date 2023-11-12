import React from 'react';
import NavBar from '../../components/NavBar'
import './style.css'
export default function paginaBase({children}) {
    return (
    <div id='principal'>
        <NavBar />
        <main className="content">
            {children}
        </main>
    </div>
    );
}