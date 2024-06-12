import React, { useState, useEffect, useRef, useContext } from "react";
import './Navbar.css';

import logo from '../Assets/newlogo.png';
import cart_icon from '../Assets/cart.png';
import user_icon from '../Assets/new-user.png';
import search_icon from '../Assets/new-search.png';
import cake from '../Assets/birthday-cake.png';
import sweets from '../Assets/cupcake (1).png';
import macarons from '../Assets/macarons.png';
import cheesecake from '../Assets/cheesecake.png';
import { Link } from "react-router-dom";
import { HomeContext } from "../../Context/HomeContext";

const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const [open, setOpen] = useState(false);
    const { getTotalCartItems } = useContext(HomeContext);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <Link to='/' onClick={() => { setMenu("home") }}>
                    <img src={logo} alt="logo" />
                </Link>
            </div>

            <ul className="nav-menu">
                <li onClick={() => { setMenu("oferta") }} className={menu === "oferta" ? "active" : ""}>
                    <Link style={{ textDecoration: 'none' }} to='/oferte'>Oferte</Link>
                </li>

                <div className='menu-container' ref={menuRef}>
                    <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                        <li>Produse</li>
                    </div>
                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                        <ul>
                            <DropdownItem img={cake} text={"Torturi"} />
                            <DropdownItem img={sweets} text={"Prajituri"} />
                            <DropdownItem img={macarons} text={"Macarons"} />
                            <DropdownItem img={cheesecake} text={"Cheesecake"} />
                        </ul>
                    </div>
                </div>

                <li onClick={() => { setMenu("eveniment") }} className={menu === "eveniment" ? "active" : ""}>
                    <Link style={{ textDecoration: 'none' }} to='/evenimente'>Evenimente</Link>
                </li>
                <li onClick={() => { setMenu("blog") }} className={menu === "blog" ? "active" : ""}>
                    <Link style={{ textDecoration: 'none' }} to='/blog'>Blog</Link>
                </li>
                <li onClick={() => { setMenu("contact") }} className={menu === "contact" ? "active" : ""}>
                    <Link style={{ textDecoration: 'none' }} to='/contact'>Contact</Link>
                </li>

                <div className="nav-cart">
                    <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                </div>

                <div className="nav-icon-user">
                    <Link to='/user' onClick={() => { setMenu("user") }}>
                        <img src={user_icon} alt="user" />
                    </Link>
                </div>

                <div className="nav-icon-search" onClick={() => { setMenu("search") }}>
                    <img src={search_icon} alt="search" />
                </div>
            </ul>

            <div className="nav-login">
                <Link to='/login'><button>Login</button></Link>
            </div>
        </div>
    );
};

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <img src={props.img} alt={props.text}></img>
            <a> {props.text}</a>
        </li>
    );
}

export default Navbar;
