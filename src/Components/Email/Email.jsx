import React from "react";
import './Email.css'

const Email = () => {
    return (
    <div className='email'>
        <h1>Primește oferte exclusive pe adresa ta de email</h1>
        <p>Abonează-te și rămâi la curent</p>
        <div>
            <input type="email" placeholder="Email" />
            <button>Aboneaza-te</button>
        </div>
    </div>
    )
}

export default Email