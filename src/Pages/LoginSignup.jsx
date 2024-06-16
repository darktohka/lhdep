import React, { useState } from "react";
import './CSS/LoginSignup.css';
import { response } from "express";

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const login = async () =>{
        console.log("Login Function Executed!", formData);
    }

    const signup = async () =>{
        console.log("Signup Function Executed!", formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method: 'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? 
                    <input name='username' value={formData.username} onChange={changeHandler} type="text" id="name"  placeholder='Nume' />:<></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" id="email"  placeholder='Adresa de email' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" id="password"  placeholder='Parola' />
                </div>
                <button onClick={()=>{state==="Login"?login():signup()}}>Continua</button>
                {state ==="Sign Up"
                ?<p className="loginsignup-login">Ai deja un cont? <span onClick={()=>{setState("Login")}}>Loghează-te aici</span></p>
                :<p className="loginsignup-login">Crează-ți un cont? <span onClick={()=>{setState("Sign Up")}}>Click aici</span></p>
                }
                <div className="loginsignup-agree">
                    <input type="checkbox" id="agree" name="agree" />
                    <label htmlFor="agree">Sunt de acord cu termenii de utilizare și politica de confidențialitate.</label>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
