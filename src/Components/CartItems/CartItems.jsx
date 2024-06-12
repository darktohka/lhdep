import React, { useContext } from "react";
import './CartItems.css'
import { HomeContext } from "../../Context/HomeContext";
import remove_icon from '../Assets/remove.png'

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(HomeContext);
    const { subtotal, deliveryFee, totalAmount } = getTotalCartAmount();

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Produse</p>
                <p>Titlu</p>
                <p>Pret</p>
                <p>Cantitate</p>
                <p>Total</p>
                <p>Elimina din cos</p>
            </div>
            <hr/>
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className="carticon-product-icon"/>
                                <p>{e.name}</p>
                                <p>{e.new_price} lei</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]} lei</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr/>
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>{subtotal} lei</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Taxa de livrare</p>
                            <p>{deliveryFee === 0 ? 'Gratuit' : `${deliveryFee} lei`}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>{totalAmount} lei</h3>
                        </div>
                    </div>
                    <button>Continuă pentru finalizare</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Daca ai un cod promo</p>
                    <div className="cartitemspromobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
