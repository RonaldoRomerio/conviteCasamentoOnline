import React from 'react';
import './style.css'

export default function LinhaDestaque({children}) {
    return (
        <div className="layoutDestaque">
            <span className='linhaDestaque'/>
            {children}
            <span className='linhaDestaque'/>
        </div>
    );
}