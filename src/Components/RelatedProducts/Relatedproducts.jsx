import React from "react";
import './RelatedProducts.css';
import data_product from '../Assets/all_product';
import Item from '../Item/Item';

const RelatedProducts = () => {
    // Limit to 5 products
    const limitedProducts = data_product.slice(0, 5);

    return (
        <div className='relatedproducts'>
            <h1>Produse asemanatoare</h1>
            <hr/>
            <div className="relatedproducts-item">
                {limitedProducts.map((item, i) => (
                    <Item 
                        key={i} 
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                    />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
