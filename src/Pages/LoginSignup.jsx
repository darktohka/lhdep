import React from "react";
import './CSS/LoginSignup.css'

const LoginSignup = () => {
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                 <input type="text" placeholder='Nume' />
                 <input type="email" placeholder='Adresa de email' />
                 <input type="password" placeholder='Parola' />
                </div>
                <button>Continua</button>
                <p className="loginsignup-login">Ai deja un cont?<span>Loghează-te aici</span></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>Sunt de acord cu termenii de utilizare și politica de confidențialitate.</p>
                </div>
            </div>
        </div>
    
    )
}

export default LoginSignup