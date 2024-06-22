import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Torturi.css";
import { HomeContext } from "../Context/HomeContext";
import Item from "../Components/Item/Item";

const Torturi = () => {
  const { all_products } = useContext(HomeContext); // Accesăm lista de produse din context
  const [searchTerm, setSearchTerm] = useState(""); // Starea pentru termenul de căutare
  const [sortOption, setSortOption] = useState(""); // Starea pentru opțiunea de sortare
  const [loadedProducts, setLoadedProducts] = useState(8); // Numărul total de produse încărcate inițial (8)
  const [showLess, setShowLess] = useState(false); // Starea pentru afișarea opțiunii "Show Less"
  const navigate = useNavigate(); // Hook-ul de navigare

  // Funcție pentru filtrarea produselor din categoria "Torturi"
  const filterProducts = () => {
    return all_products.filter(
      (product) =>
        product.category === "Torturi" &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Funcție pentru sortarea produselor în funcție de opțiunea selectată
  const sortProducts = (products) => {
    let sortedProducts = [...products]; // Copiem lista de produse

    switch (sortOption) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.new_price - b.new_price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.new_price - a.new_price);
        break;
      default:
        // Nu facem nimic dacă nu este selectată o opțiune validă de sortare
        break;
    }

    return sortedProducts;
  };

  // Funcție pentru încărcarea mai multor produse
  const handleLoadMore = () => {
    setLoadedProducts(loadedProducts + 4); // Creștem numărul de produse încărcate cu 4
    setShowLess(true); // Arătăm opțiunea "Show Less"
  };

  // Funcție pentru afișarea mai puțin
  const handleShowLess = () => {
    setLoadedProducts(8); // Resetează numărul de produse încărcate la 8 (doar prima pagină)
    setShowLess(false); 
  };

  let filteredProducts = filterProducts();


  let sortedProducts = sortProducts(filteredProducts);


  const chunkArray = (array, size) => {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };


  let chunkedProducts = chunkArray(sortedProducts.slice(0, loadedProducts), 4);

  return (
    <div className="torturi-container">
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Căutare torturi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p>
          <span>
            Viewing 1-{Math.min(loadedProducts, filteredProducts.length)} of {filteredProducts.length} products
          </span>
        </p>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="">Sortează</option>
          <option value="priceAsc">Preț crescător</option>
          <option value="priceDesc">Preț descrescător</option>
        </select>
      </div>
      <div className="torturi-products">
        {chunkedProducts.map((chunk, index) => (
          <div className="torturi-product-row" key={index}>
            {chunk.map((product) => (
              <div
                className="torturi-product"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="torturi-product-image"
                  loading="lazy"
                />
                <div className="torturi-product-info">
                  <h3>{product.name}</h3>
                  <p className="price-old">{product.old_price} Lei</p>
                  <p className="price-new">{product.new_price} Lei</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {loadedProducts < sortedProducts.length ? (
        <div className="homecategory-loadmore" onClick={handleLoadMore}>
          Vezi mai mult
        </div>
      ) : showLess ? (
        <div className="homecategory-less" onClick={handleShowLess}>
          Afișează mai puțin
        </div>
      ) : null}
    </div>
  );
};

export default Torturi;
