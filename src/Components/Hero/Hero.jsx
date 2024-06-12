import React, { useState, useEffect } from 'react';
import './Hero.css';
import image1 from '../Assets/torta1.jpg';
import image2 from '../Assets/torta2.jpg';
import image3 from '../Assets/torta3.jpg';
import image4 from '../Assets/torta4.jpg';
import image5 from '../Assets/torta5.jpg';

const images = [image1, image2, image3, image4, image5];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Descopera</h2>
        <p>
          Tortul perfect pentru aniversarea, botezul sau evenimentul tau.
        </p>
        <div className="hero-button">Alege!</div>
      </div>
      <div className="hero-right">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Torta ${index + 1}`}
            className={`hero-image ${index === currentImageIndex ? 'fade-in' : 'fade-out'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
