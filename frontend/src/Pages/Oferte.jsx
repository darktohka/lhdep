// Import ShopContextProvider și ShopContext
import React, { useContext } from "react";
import ShopContextProvider, { ShopContext } from "./ShopContext";

const Oferte = () => {
    // Folosește useContext pentru a accesa contextul
    const { all_product } = useContext(ShopContext);

    // Acum poți folosi all_product în componenta ta
    // De exemplu, afișează primele 12 produse într-un grid
    const first12Products = all_product.slice(0, 12);

    return (
        <div>
            <h2>Oferte</h2>
            <div className="product-grid">
                {first12Products.map((product, index) => (
                    <div key={index} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Oferte;
