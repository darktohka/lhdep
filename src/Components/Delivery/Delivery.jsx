import React from "react";
import './Delivery.css'
import image from "../Assets/dentist.jpg"
const Delivery = () => {
    return (
        <div className='delivery'>
            <div className="delivery-left">
                <h1>Livrare gratuita!</h1>
                <p>La comenzi de peste 300 de lei!</p>
                <button>Cumpara acum!</button>
            </div>
            <div className="delivery-right">
                <img src={image} alt="" />
            </div>
        </div>
    )
}

export default Delivery