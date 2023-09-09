import React, { useEffect, useContext, useState} from 'react';
import './Style.css';
import ScrollButton from '../../components/ScrollButton'
import { BsCheckAll, BsBox2Heart, BsPinMap } from "react-icons/bs";
import { isDesktop } from 'react-device-detect';
import LinhaDestaque from '../../components/LinhaDestaque';
import { SwalContext } from '../../Context/SwalContext';
import { useHref } from 'react-router-dom';
import { db } from '../../service/firebase';
import { collection, doc, getDocs, getDoc, setDoc } from 'firebase/firestore';
import { retornaMesPt, diaDaSemanaPt } from '../../util/TraduzData';  
export default function Convite() {

    const { swalAlert, swalToast } = useContext(SwalContext);
    const [infoConvite, setInfoConvite] = useState({});
    const caminho = useHref().split('/');

    useEffect(() => {
        capturaInformacoesDoConvite();
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    async function capturaInformacoesDoConvite() {
        const nomeDocasalBusca = await getDoc(doc(db, "usuarios", caminho[2]));
        const nomeDoCasal = nomeDocasalBusca.data().nomeCasal;

        const convidadosBusca = await getDoc(doc(db, "usuarios", caminho[2], "convidados", caminho[3]));
        const nomeDosConvidados = convidadosBusca.data().convidados;

        const dataBusca = await getDocs(collection(db, "usuarios", caminho[2], "datas"));
        let dataDaCerimonia = '';
        dataBusca.forEach((doc) => {dataDaCerimonia = doc.data().dataEvento + "T" + doc.data().horaEvento});
        
        const localBusca = await getDocs(collection(db, "usuarios", caminho[2], "endereco"));
        let EnderecoDaCerimonia = '';
        localBusca.forEach((doc) => {EnderecoDaCerimonia = doc.data().urlEndereco});
        setInfoConvite({
            "nomeDoCasal": nomeDoCasal,
            "convidados": nomeDosConvidados,
            "dataDaCerimonia" : dataDaCerimonia,
            "endereco": EnderecoDaCerimonia
        })
    }

    async function confirmaPresenca(){
        try{
            await setDoc(doc(db, "usuarios", caminho[2], "convidados", caminho[3]), {
                "confirmacao": true,
            }, {merge: true});
            swalAlert('Presença confirmada', 'Sua presença já foi confirmada, aguarde para mais informações', 'success');
        } catch(e){
            swalToast('error', e);
        }
    }

if (!isDesktop) {
    return (
        <div id="telaConvite">
            <div className='telaConvite' id='mensagem'>
                <div id="mensagemConvidado">
                    <p className='letraEscrita'> {infoConvite.nomeDoCasal}</p>
                    <p>convidam</p>
                    <p className='letraEscrita'>{infoConvite.convidados}</p>
                    <p className='linha' />
                    <p>para celebrar conosco e compartilhar dessa grande alegria.</p>
                    <p>Sua presença é muito importante para nós.</p>
                </div>
                <ScrollButton referencia={'#data'} />
            </div>
            <div className='telaConvite' id='data'>
                <ScrollButton roda={1} referencia={'#mensagem'} />
                <div id="dataEvento">
                    <p>{diaDaSemanaPt(new Date(infoConvite.dataDaCerimonia).getDay())}</p>
                    <LinhaDestaque>
                        <p className='letraEscrita'>
                            {new Date(infoConvite.dataDaCerimonia).getDate()}
                        </p>
                    </LinhaDestaque>
                    <p>{retornaMesPt(new Date(infoConvite.dataDaCerimonia).getMonth())}</p>
                    <p className='letraEscrita'>
                        {new Date(infoConvite.dataDaCerimonia).getHours()} : {new Date(infoConvite.dataDaCerimonia).getMinutes().toString().padStart(2,"0")}
                    </p>
                </div>
                <ScrollButton referencia={'#botoes'} />
            </div>
            <div className='telaConvite' id='botoes'>
                <ScrollButton roda={1} referencia={'#data'} />
                <div id="botoesAcao">
                    <div className='botao' style={{display: infoConvite.confirmacao ? "none" : "block"}}>
                        <button onClick={() => confirmaPresenca()}><BsCheckAll size={25} /></button>
                        <p className='textoBotao'>Confirmação</p>
                    </div>
                    <div className='botao'>
                        <a href={infoConvite.endereco}><button><BsPinMap size={25} /></button></a>
                        <p className='textoBotao'>Local</p>
                    </div>
                    <div className='botao'>
                        <button><BsBox2Heart size={25} /></button>
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
