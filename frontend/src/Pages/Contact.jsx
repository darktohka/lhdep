import React, { useState } from 'react';
import './CSS/Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Contactați-ne</h1>
      </header>
      <section className="content">
        <div className="details">
          <h2>Detaliile Laboratorului</h2>
          <p><strong>Adresă:</strong> Romania, Județul Mureș, Oraș Reghin, Str. Tâmplarilor 13A</p>
          <p><strong>Telefon:</strong> 0722 249 998 / 0749 158 188</p>
          <p><strong>Email:</strong> littleheaven@gmail.com</p>
          <p><strong>Ore de lucru:</strong></p>
          <ul>
            <li>Luni - Vineri: 09:00 - 18:00</li>
            <li>Sâmbătă: 10:00 - 14:00</li>
            <li>Duminică: Închis</li>
          </ul>
        </div>
        <div className="map-container">
          <h2>Localizare</h2>
          <div className="map">
            <iframe
              title="Locația Little Heaven"
              width="100%"
              height="300"
              frameborder="0" style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.511641961537!2d23.754985715803176!3d46.77828997913897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c64f6ad830f93%3A0x189a79e2228b1d60!2sStrada%20T%C3%A2mplarilor%2013A%2C%20Reghin%2C%20Romania!5e0!3m2!1sen!2suk!4v1623319357857!5m2!1sen!2suk"
              allowfullscreen>
            </iframe>
          </div>
        </div>
        
        {}
        <div className="contact-statement">
          <h2>Comenzi mari</h2>
          <p>
            Pentru a plasa o comandă mai mare, vă rugăm să ne sunați la oricare dintre numerele de telefon de mai sus și vă vom programa o întâlnire telefonică în cel mai scurt timp posibil.
          </p>
        </div>
        
        <div className="faq">
  <h2>Întrebări frecvente</h2>
  <p><strong>1. Ce preț are tortul?</strong><br/> Prețul torturilor se referă la kilogram.</p>
  <p><strong>2. Cum pot plasa o comandă?</strong><br/> Puteți plasa o comandă adăugând produsul în coș și completând detaliile necesare.</p>
  <p><strong>3. Ce modalități de plată sunt acceptate?</strong><br/> Momentan acceptăm doar plata în numerar (cash). Plățile cu cardul nu sunt disponibile.</p>
  <p><strong>4. Pot comanda torturi mai mari de 5 kg?</strong><br/> Da, pentru comenzi mai mari de 5 kg vă rugăm să ne contactați pentru a programa o întâlnire telefonică.</p>
  <p><strong>5. Cum pot comanda pentru evenimente speciale (majorate, botezuri, nunți)?</strong><br/> Vă rugăm să ne contactați telefonic pentru comenzi destinate majoratelor, botezurilor sau nunților.</p>
</div>


        <div className="transport-parking-info">
          <h2>Informații despre transport și parcare</h2>
          <p>Locația noastră este accesibilă prin transportul public și oferim facilități de parcare gratuite în apropiere.</p>
          {}
        </div>

        {submitted && (
          <div className="submission-confirmation">
            <p>Mesajul tău a fost trimis cu succes. Vom lua legătura în cel mai scurt timp posibil.</p>
          </div>
        )}

      </section>
    </div>
  );
};

export default Contact;
