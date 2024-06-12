import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product';

export const HomeContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}
const HomeContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}))
        console.log(cartItems);
    }   

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]: prev[itemId]-1}))
    }
    const getTotalCartAmount = () => {
        let subtotal = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product) => product.id === Number(item));
                subtotal += itemInfo.new_price * cartItems[item];
            }
        }
        let deliveryFee = subtotal > 300 ? 0 : 20;
        let totalAmount = subtotal + deliveryFee;
        return { subtotal, deliveryFee, totalAmount };
    }
    
    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };
    

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <HomeContext.Provider value={contextValue}>
            {props.children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
