import React, { useState } from 'react';
import './CSS/Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // need to add the logic for sending
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
          <p><strong>Telefon:</strong> +40 123 456 789</p>
          <p><strong>Email:</strong> contact@littleheaven.ro</p>
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
        <div className="contact-form">
          <h2>Formular de Contact</h2>
          <p>
            Pentru a programa o întâlnire telefonică în vederea unei comenzi mai diferite, vă rugăm să completați formularul de mai jos cu numele și adresa dvs. de email, iar noi vă vom contacta în cel mai scurt timp posibil.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nume</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Număr de telefon</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="preferred-time">Ora preferată pentru contact</label>
              <input type="text" id="preferred-time" name="preferred-time" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mesaj</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit">Trimite</button>
          </form>
        </div>
        
        <div className="faq">
          <h2>Întrebări frecvente</h2>
          <p><strong>1. Cum pot plasa o comandă?</strong><br/> Pentru a plasa o comandă, completați formularul de contact de mai sus și vă vom contacta în cel mai scurt timp posibil.</p>
          <p><strong>2. Care sunt orele de funcționare?</strong><br/> Orele noastre de funcționare sunt...</p>
          {/* Adaugă mai multe întrebări și răspunsuri în funcție de necesități */}
        </div>

        <div className="transport-parking-info">
          <h2>Informații despre transport și parcare</h2>
          <p>Locația noastră este accesibilă prin transportul public și oferim facilități de parcare gratuite în apropiere.</p>
          {/* Adaugă mai multe detalii despre transport și parcare în funcție de necesități */}
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
