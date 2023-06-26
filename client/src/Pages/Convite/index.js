import React, {useEffect} from 'react';
import './Style.css';
import ScrollButton from '../../components/ScrollButton'
import { BsCheckAll, BsBox2Heart, BsPinMap } from "react-icons/bs";
import { isDesktop } from 'react-device-detect';
import LinhaDestaque from '../../components/LinhaDestaque';
export default function Convite() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (!isDesktop) {
        return (
            <div id="telaConvite">
                <div className='telaConvite' id='mensagem'>
                    <div id="mensagemConvidado">
                        <p className='letraEscrita'> Samantha e Ronaldo</p>
                        <p>convidam</p>
                        <p className='letraEscrita'>Samuel e Juliana</p>
                        <p className='linha'/>
                        <p>para celebrar conosco e compartilhar dessa grande alegria.</p>
                        <p>Sua presença é muito importante para nós.</p>
                    </div>
                    <ScrollButton referencia={'#data'} />
                </div>
                <div className='telaConvite' id='data'>
                    <ScrollButton roda={1} referencia={'#mensagem'} />
                    <div id="dataEvento">
                        <p>Sábado</p>
                        <LinhaDestaque><p className='letraEscrita'>20</p></LinhaDestaque>
                        <p>Janeiro</p>
                        <p className='letraEscrita'>19:00</p>
                    </div>
                    <ScrollButton referencia={'#botoes'} />
                </div>
                <div className='telaConvite' id='botoes'>
                    <ScrollButton roda={1} referencia={'#data'} />
                    <div id="botoesAcao">
                        <div className='botao'>
                            <button><BsCheckAll size={25} /></button>
                            <p className='textoBotao'>Confirmação</p>
                        </div>
                        <div className='botao'>
                            <a href='https://goo.gl/maps/L1KgQhRaAHZ2HLv79'><button><BsPinMap size={25} /></button></a>
                            <p className='textoBotao'>Local</p>
                        </div>
                        <div className='botao'>
                            <button><BsBox2Heart size={25}/></button>
                            <p className='textoBotao'>Lista de presentes</p>
                        </div>
                        <footer>
                            <p className='letraEscrita'>Contamos com a sua presença para brindar conosco</p>
                        </footer>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="App">
                <p>Não é possível visualizar de um dispositivo desktop. Por favor, acesse do celular</p>
            </div>
        );
    }
}




/*
confirmação: BsCheckAll
presentes: BsBox2Heart
localização: BsPinMap




*/