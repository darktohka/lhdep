import React, { useContext } from "react";
import './RelatedProducts.css';
import { HomeContext } from "../../Context/HomeContext";
import Item from '../Item/Item';

const RelatedProducts = () => {
    const { all_products } = useContext(HomeContext);

    // Limităm la primele 5 produse
    const limitedProducts = all_products.slice(46, 51);

    return (
        <div className='relatedproducts'>
            <h1>Produse asemanatoare</h1>
            <hr/>
            <div className="relatedproducts-item">
                {limitedProducts.map((item) => (
                    <Item 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        image={item.images[0]} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                    />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
