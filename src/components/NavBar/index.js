import React, { useState } from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import {BsFillCalendarEventFill, BsFillPinMapFill, BsPerson, BsFillGrid1X2Fill, BsGrid3X2Gap, BsCashCoin, BsFillGearFill, BsFillArrowLeftCircleFill} from "react-icons/bs";
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    var largura = window.screen.width;
    return (
        <div>
            <div id="ativaSideBar"><BsGrid3X2Gap onClick={() => (setIsOpen(!isOpen))} size={30}/></div>
            <div className= {isOpen ? "navBar active" : "navBar"}>
                <div id="desativaSideBar"><BsFillArrowLeftCircleFill onClick={() => (setIsOpen(!isOpen))} size={30}/></div>
                <Link to={'/Configuracao'} className='navLink'> <BsFillGearFill size={22}/><span>CONFIGURAÇÃO</span></Link>
                <Link to={'/convidados'} className='navLink'> <BsPerson size={22}/><span>CONVIDADOS</span></Link>
                <Link to={'/endereco'} className='navLink'> <BsFillPinMapFill size={22}/><span>ENDEREÇO</span></Link>
                <Link to={'/datas'} className='navLink'> <BsFillCalendarEventFill size={22}/><span>DATAS</span></Link>
                <Link to={'/galeria'} className='navLink'> <BsFillGrid1X2Fill size={22}/><span>GALERIA</span></Link>
                <Link to={'/financeiro'} className='navLink'> <BsCashCoin size={22}/><span>FINANCEIRO</span></Link>
            </div>
            <div className={isOpen ? "espacoTotal active" : "espacoTotal"} onClick={() => (setIsOpen(!isOpen))}/>
        </div>
    );
}