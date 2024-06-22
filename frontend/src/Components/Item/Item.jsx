import React from 'react';
import './item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, name, image, new_price, old_price }) => {
    const handleImageClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="item">
            <Link to={`/product/${id}`}>
                <img
                    src={image}
                    alt={name}
                    onClick={handleImageClick} // Apelăm funcția handleImageClick la clic pe imagine
                />
            </Link>
            <div className="item-content">
                <h2>{name}</h2>
                <p className="new-price">{new_price.toFixed(2)} Lei</p>
                <p className="old-price">{old_price.toFixed(2)} Lei</p>
            </div>
        </div>
    );
};

export default Item;
