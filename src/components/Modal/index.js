import React, { useEffect, useState } from 'react';
import './style.css'
import {BiExit} from 'react-icons/bi'
export default function Modal({children, statusModal}) {
    const [isvisible, setIsVisible] = useState(statusModal)
    useEffect(() => {console.log(statusModal)}, [isvisible]);
    return (
    <div id="modal" style={{display: isvisible ? "block" : "none"}}>
        <div className='containerModal' >
            <button className='botaoFechar' onClick={() => setIsVisible(false)}><BiExit size={28}/></button>
            {children}
        </div>
    </div>
    );
}