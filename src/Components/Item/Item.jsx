import React from 'react';
import './item.css';
import {Link} from 'react-router-dom'
const Item = ({ id, name, image, new_price, old_price }) => {
    return (
        <div className="item">
            <Link to={`/product/${id}`}><img onClick={window.scrollTo(0,0)} src={image} alt={name} /></Link>
            <div className="item-content">
                <h2>{name}</h2>
                <p className="new-price">New Price: ${new_price.toFixed(2)}</p>
                <p className="old-price">Old Price: ${old_price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Item;
