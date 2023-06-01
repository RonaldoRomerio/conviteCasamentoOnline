import React from 'react';
import './style.css'
import { BsCheckAll, BsBox2Heart, BsPinMap } from "react-icons/bs"
export default function convite() {
    return (
        <div id="telaConvite">
            <main id="mensagemConvidado">
                <p className='LetraEscrita'> Samantha e Ronaldo</p>
                <p>convidam</p>
                <p className='LetraEscrita'>Samuel e Juliana</p> 
                <p>para celebrar conosco e compartilhar dessa grande alegria.</p>
                <p>Sua presença é muito importante para nós.</p>
            </main>
                <div id="dataEvento">
                <p>Sábado</p>
                <p className='LetraEscrita'>20</p>
                <p>Janeiro</p>
                <p>19:30</p>
            </div>
            <div id="botoesAcao">
                <div className='botao'>
                    <button><BsCheckAll size={25}/></button>
                    <p className='textoBotao'>Confirmação</p>
                </div>
                <div className='botao'>
                    <button><BsPinMap size={25}/></button>
                    <p className='textoBotao'>Local</p>
                </div>
                <div className='botao'>
                    <button><BsBox2Heart size={25}/></button>
                    <p className='textoBotao'>Lista de presentes</p>
                </div>
                <div className='linha'/>
                <footer>
                    <p className='LetraEscrita'>Contamos com a sua presença para brindar conosco</p>
                </footer>
            </div>
        </div>
    );
}




/*
confirmação: BsCheckAll
presentes: BsBox2Heart
localização: BsPinMap




*/