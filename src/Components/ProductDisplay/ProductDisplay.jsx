import React, { useContext } from "react";
import './ProductDisplay.css'
import star_icon from "../Assets/star.png"
import star_icon_empty from "../Assets/star-empty.png"
import { HomeContext } from "../../Context/HomeContext";
const ProductDisplay = (props) => {
    const { product } = props;
    const {addToCart} = useContext(HomeContext);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />
                    <img src={product.image} alt="Product thumbnail" />

                </div>
                <img className='productdisplay-main-img' src={product.image} alt="Main product" />
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-description">
                    Descrierea tortului
                </div>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon_empty} alt="Empty star" />
                    <p>(12)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">{product.old_price} Lei</div>
                    <div className="productdisplay-right-price-new">{product.new_price} Lei</div>
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>1Kg</div>
                        <div>2Kg</div>
                        <div>3Kg</div>
                        <div>4Kg</div>
                        <div>5Kg</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>Adauga in cos</button>
                <p className='productdisplay-right-category'></p>
            </div>
        </div>
    )
}

export default ProductDisplay;
