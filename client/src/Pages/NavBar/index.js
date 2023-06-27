import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import {BsFillCalendarEventFill, BsFillPinMapFill, BsPerson} from "react-icons/bs";
export default function NavBar() {
    return (
        <div id="navBar">
            <a className='navLink'> <BsPerson size={20}/> <span>CONVIDADOS</span></a>
            <a className='navLink'> <BsFillPinMapFill size={15}/> <span>LOCAL</span></a>
            <a className='navLink'> <BsFillCalendarEventFill size={15}/> <span>DATA</span></a>
        </div>
    );
}