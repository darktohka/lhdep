import React, { createContext, useEffect, useState } from "react";

export const HomeContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const HomeContextProvider = (props) => {
  const [all_products, setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(20);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        setAll_Products(data);
        setCartItems(getDefaultCart(data));
      })
      .catch((error) => console.error('Error fetching all products:', error));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error('Error fetching cart:', error));
    }
  }, []);

  const addToCart = (itemId, quantity = 1) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, quantity }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error adding to cart:', error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error removing from cart:', error));
    }
  };

  const getTotalCartAmount = () => {
    let subtotal = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = all_products.find((product) => product.id === Number(itemId));
        if (itemInfo) {
          subtotal += itemInfo.new_price * cartItems[itemId];
        }
      }
    }
    const deliveryFee = subtotal > 300 ? 0 : 20;
    const totalAmount = subtotal + deliveryFee;
    return { subtotal, deliveryFee, totalAmount };
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalItems += cartItems[itemId];
      }
    }
    return totalItems;
  };

  const createOrder = async (orderData) => {
    try {
      const response = await fetch('http://localhost:4000/createorder', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    setDeliveryFee,
    createOrder, // Include createOrder in context
  };

  return <HomeContext.Provider value={contextValue}>{props.children}</HomeContext.Provider>;
};

export default HomeContextProvider;
