import React from 'react';
import './Style.css'
export default function ScrollButton({roda, referencia}) {
  return (
    <div>
      <a className='clickScroll' style={{transform: `rotate(${180 * roda}deg)`}} href={referencia}>
        <span />
        <span />
      </a>
    </div>
  );
}