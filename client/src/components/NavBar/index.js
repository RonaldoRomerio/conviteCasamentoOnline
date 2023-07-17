import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import {BsFillCalendarEventFill, BsFillPinMapFill, BsPerson, BsFillGrid1X2Fill} from "react-icons/bs";
export default function NavBar() {
    return (
        <div id="navBar">
            <Link to={'/convidados'} className='navLink'> <BsPerson size={20}/> <span>CONVIDADOS</span></Link>
            <Link to={'/endereco'} className='navLink'> <BsFillPinMapFill size={15}/> <span>LOCAL</span></Link>
            <Link to={'/data'} className='navLink'> <BsFillCalendarEventFill size={15}/> <span>DATA</span></Link>
            <Link to={'/galeria'} className='navLink'> <BsFillGrid1X2Fill size={15}/> <span>GALERIA</span></Link>
        </div>
    );
}