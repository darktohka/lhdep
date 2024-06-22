import React, { useState, useContext, useEffect } from "react";
import "./ProductDisplay.css";
import { HomeContext } from "../../Context/HomeContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(HomeContext);


  const [mainImage, setMainImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    if (product && product.images) {
      setMainImage(product.images[0]);
      setThumbnails(product.images.slice(1));
    }
  }, [product]);

  const handleThumbnailClick = (image, index) => {
    const newThumbnails = [...thumbnails];
    const previousMainImage = mainImage;
    newThumbnails[index] = previousMainImage;
    setMainImage(image);
    setThumbnails(newThumbnails);
  };


  if (!product || !product.images) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {

    addToCart(product.id, 1);
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {}
          {thumbnails.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleThumbnailClick(image, index)}
              className="thumbnail-image"
            />
          ))}
        </div>
        {}
        <img className="productdisplay-main-img" src={mainImage} alt="Main product" />
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-description">{product.description}</div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">{product.old_price} Lei</div>
          <div className="productdisplay-right-price-new">{product.new_price} Lei</div>
        </div>
        <div className="productdisplay-right-size">
          <button onClick={handleAddToCart}>Adaugă în coș</button>
        </div>
        <p className="productdisplay-right-category">Categorie: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
