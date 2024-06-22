import React, { useState } from "react";
import './CSS/LoginSignup.css';

const LoginSignup = () => {

    const [state, setState] = useState("Autentificare");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const login = async () => {
        console.log("Funcția de Autentificare Executată", formData);
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }


    }

    const signup = async () => {
        console.log("Funcția de Înregistrare Executată", formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)
        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
    }


    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Înregistrare"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Nume' />:<></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Adresa de email' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Parola'  />
                </div>
                    <button onClick={()=>{state==="Autentificare"?login():signup()}}>Continua</button> 
                    {state==="Înregistrare"
                    ?<p className="loginsignup-login">Ai deja un cont? <span onClick={() => {setState("Autentificare")}}>Loghează-te aici</span></p>
                    :<p className="loginsignup-login">Crează-ți un cont? <span onClick={() => {setState("Înregistrare")}}>Click aici</span></p>
                    }
            </div>
        </div>
    );
}

export default LoginSignup;
