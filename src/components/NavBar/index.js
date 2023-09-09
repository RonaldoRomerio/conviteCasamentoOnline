import React, { useState } from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import {BsFillCalendarEventFill, BsFillPinMapFill, BsPerson, BsFillGrid1X2Fill, BsGrid3X2Gap, BsCashCoin, BsFillGearFill} from "react-icons/bs";
export default function NavBar() {
    const [mostraItens, setMostraItens] = useState(true);
    var largura = window.screen.width;
    return (
        <div>
            <div id="mobileNavBar"><BsGrid3X2Gap onClick={() => (setMostraItens(!mostraItens))} size={30}/></div>
            <div id="navBar" style={{
                                        display: mostraItens && largura < 700 ? 'none' : 'flex',
                                        height: mostraItens && largura < 700 ? '0' : '100%'
                                    }}>
                <Link to={'/Configuracao'} className='navLink'> <BsFillGearFill size={20}/> <span>CONFIGURACAO</span></Link>
                <Link to={'/convidados'} className='navLink'> <BsPerson size={20}/> <span>CONVIDADOS</span></Link>
                <Link to={'/endereco'} className='navLink'> <BsFillPinMapFill size={15}/> <span>LOCAIS</span></Link>
                <Link to={'/datas'} className='navLink'> <BsFillCalendarEventFill size={15}/> <span>DATAS</span></Link>
                <Link to={'/galeria'} className='navLink'> <BsFillGrid1X2Fill size={15}/> <span>GALERIA</span></Link>
                {/*<Link to={'/financeiro'} className='navLink'> <BsCashCoin size={15}/> <span>FINANCEIRO</span></Link>*/}
            </div>
        </div>
    );
}