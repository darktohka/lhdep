import React from "react";
import { Link } from "react-router-dom";
import "./Delivery.css";
import image from "../Assets/dentist.jpg";

const Delivery = () => {
    return (
        <div className="delivery">
            <div className="delivery-left">
                <h1>Livrare gratuită!</h1>
                <p>La comenzi de peste 300 de lei!</p>
                <Link to="/oferte" className="buy-now-button">
                    Cumpără acum!
                </Link>
            </div>
            <div className="delivery-right">
                <img src={image} alt="" />
            </div>
        </div>
    );
};

export default Delivery;
