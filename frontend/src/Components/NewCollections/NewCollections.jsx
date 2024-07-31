import React, { useEffect, useState } from "react";
import "./NewCollections.css";
// import listproduct from "../Assets/listproduct"; // Importul listei de produse
import Item from "../Item/Item";

const NewCollections = () => {

  const[new_collection, setNew_collection] = useState([]);

  useEffect(()=>{
    fetch('https://api.littleheaven.me/oferte')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  },[])

  // Selecția primelor 10 produse din listproduct
//   const productsToShow = listproduct.slice(0, 8);

  return (
    <div className="newCollections">
      <h1>NOU</h1>
      <hr />
      <div className="collections">
        {new_collection.map((product, index) => (
          <Item
            key={index}
            id={product.id}
            name={product.name}
            image={product.images[0]} // Folosim prima imagine din array-ul de imagini
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
