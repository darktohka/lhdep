import React from "react";
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram2.png'
import facebook_icon from '../Assets/facebook2.png'
import tiktok_icon from '../Assets/tiktok.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>LITTLE HEAVEN</p>
            </div>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <a href="https://www.instagram.com/little_heaven.21/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram_icon} alt="Instagram" />
                    </a>
                </div>
                <div className="footer-icons-container">
                    <a href="https://web.facebook.com/profile.php?id=100066879197362" target="_blank" rel="noopener noreferrer">
                        <img src={facebook_icon} alt="Facebook" />
                    </a>
                </div>

            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All right Served.</p>
            </div>
        </div>
    )
}

export default Footer;
