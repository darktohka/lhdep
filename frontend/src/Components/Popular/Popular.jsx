import React, { useContext } from 'react';
import './Popular.css';
import Item from '../Item/Item';
import { HomeContext } from "../../Context/HomeContext";

const Popular = () => {
  const { all_products } = useContext(HomeContext); // Accesăm lista de produse din context

  // Funcție pentru a obține primele 5 produse din lista de produse
  const getTopProducts = () => {
    return all_products.slice(29, 34);
  };

  // Obținem primele 5 produse
  const topProducts = getTopProducts();

  return (
    <div className="popular">
      <h1>RECOMANDĂRI ALE CLIENȚILOR</h1>
      <hr />
      <div className="popular-items">
        {topProducts.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.images[0]} // Folosim prima poză din array-ul de imagini
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
