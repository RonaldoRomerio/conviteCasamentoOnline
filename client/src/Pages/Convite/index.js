import React from 'react';
import './style.css'
export default function convite() {
    return (
        <div id="telaConvite">
            <main id="mensagemConvidado">
                <p className='LetraEscrita'>Samantha e Ronaldo</p>
                <p className='textoGeral'>Convidam</p>
                <p className='LetraEscrita'>Samuel e Juliana</p> 
                <p className='textoGeral'>para celebrar conosco e compartilhar dessa grande alegria.</p>
                <p className='textoGeral'>Sua presença é muito importante para nós.</p>
            </main>
            <div id="dataEvento">
                <p className='textoGeral'>Sábado</p>
                <p className='LetraEscrita'>20</p>
                <p className='textoGeral'>Janeiro</p>
                <p className='textoGeral'>19:30</p>
            </div>
            <div id="botoesAcao">
                <div className='botao'>
                    <button>Confirmação</button>
                    <p className='textoBotao'>Confirmação</p>
                </div>
                <div className='botao'>
                    <button>Local</button>
                    <p className='textoBotao'>Local</p>
                </div>
                <div className='botao'>
                    <button>Lista de presentes</button>
                    <p className='textoBotao'>Lista de presentes</p>
                </div>
                
            </div>
            <footer>
                <p className='LetraEscrita'>Contamos com a sua presença para brindar conosco</p>
            </footer>
        </div>
    );
}