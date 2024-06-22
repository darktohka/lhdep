import React, { useContext, useState } from "react";
import "./CSS/HomeCategory.css";
import { HomeContext } from "../Context/HomeContext";
import dropdown_icon from "../Components/Assets/dropdown.png";
import Item from "../Components/Item/Item";

const HomeCategory = (props) => {
  const { all_products } = useContext(HomeContext); // Folosim all_products din context
  const [sortBy, setSortBy] = useState(""); // Stare pentru opțiunea de sortare
  const [dropdownOpen, setDropdownOpen] = useState(false); // Stare pentru meniul dropdown
  const [visibleProducts, setVisibleProducts] = useState(4); // Numărul inițial de produse vizibile
  const [loadedProducts, setLoadedProducts] = useState(4); // Numărul total de produse încărcate
  const [showLess, setShowLess] = useState(false); // Stare pentru afișarea mai puțin

  // Funcție pentru sortarea produselor în funcție de opțiunea selectată
  const sortProducts = (sortBy) => {
    let sortedProducts = [...all_products]; // Folosim all_products din context

    switch (sortBy) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.new_price - b.new_price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.new_price - a.new_price);
        break;
      default:
        // Nu facem nimic dacă este selectată o opțiune de sortare invalidă
        break;
    }

    return sortedProducts;
  };

  // Funcție pentru gestionarea schimbării opțiunii de sortare
  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setDropdownOpen(false); // Închidem dropdown-ul după selectare
    setVisibleProducts(4); // Resetăm numărul de produse vizibile la 4 după schimbarea sortării
    setLoadedProducts(4); // Resetăm numărul de produse încărcate la 4 după schimbarea sortării
    setShowLess(false); // Resetăm starea de afișare mai puțin
  };

  // Funcție pentru încărcarea mai multor produse
  const handleLoadMore = () => {
    setVisibleProducts(visibleProducts + 4); // Creștem numărul de produse vizibile cu 4
    setLoadedProducts(visibleProducts + 4); // Actualizăm numărul total de produse încărcate
    setShowLess(true); // Activăm opțiunea de afișare mai puțin
  };

  // Funcție pentru afișarea mai puțin de produse
  const handleShowLess = () => {
    setVisibleProducts(4); // Resetăm numărul de produse vizibile la 4
    setShowLess(false); // Dezactivăm opțiunea de afișare mai puțin
  };

  // Aplicăm sortarea produselor în funcție de opțiunea selectată
  const sortedProducts = sortProducts(sortBy);

  // Afișăm doar primele 25 de produse dintr-o listă amestecată
  const shuffledProducts = sortedProducts.sort(() => Math.random() - 0.5).slice(0, 25);

  return (
    <div className="home-category">
      <div className="homecategory-banner">
        <img src={props.banner} alt="Banner" />
        <div className="home-category-discount">
          <p>Oferte săptămânale: Cumpără mai mult, plătește mai puțin!</p>
        </div>
      </div>
      <div className="shopcategory-indexSort">
        <p>
          <span>Vizualizare 1-{visibleProducts} din {shuffledProducts.length} produse</span>
        </p>
        <div className="homecategory-sort">
          <div className="custom-dropdown">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="sort-button">
              Sortează <img src={dropdown_icon} alt="Icon de sortare" className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`} />
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={() => handleSortChange("priceAsc")}>Preț (Crescător)</li>
                <li onClick={() => handleSortChange("priceDesc")}>Preț (Descrescător)</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="homecategory-products">
        {shuffledProducts.slice(0, visibleProducts).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.images[0]} // Acces corect la imagine
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      {loadedProducts < shuffledProducts.length ? (
        <div className="homecategory-loadmore" onClick={handleLoadMore}>
          Explorează mai mult
        </div>
      ) : showLess ? (
        <div className="homecategory-loadmore show-less" onClick={handleShowLess}>
          Afișează mai puțin
        </div>
      ) : (
        <div className="homecategory-loadmore" onClick={handleLoadMore}>
          Explorează mai mult
        </div>
      )}
    </div>
  );
};

export default HomeCategory;
