import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { HomeContext } from "../../Context/HomeContext";
import remove_icon from "../Assets/remove.png";
import { DatePicker, TimePicker, Input, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const CartItems = () => {
  const {
    all_products,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    createOrder,
    addToCart,
  } = useContext(HomeContext);

  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [phone, setPhone] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [weights, setWeights] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(0); // Default delivery fee

  useEffect(() => {
    // Initial delivery fee calculation based on default delivery option
    setDeliveryFee(calculateDeliveryFee(deliveryOption));
  }, [deliveryOption]);

  const handleCreateOrder = async () => {
    try {
      // Validation checks
      if (Object.keys(cartItems).every((itemId) => cartItems[itemId] === 0)) {
        alert(
          "Coșul de cumpărături este gol. Adăugați produse înainte de a plasa comanda!"
        );
        return;
      }

      if (!selectedDate || !selectedTime) {
        alert("Selectați data și ora pentru ridicare/livrare!");
        return;
      }

      if (deliveryOption === "delivery" && !address) {
        alert("Introduceți adresa de livrare!");
        return;
      }

      if (!paymentMethod) {
        alert("Selectați metoda de plată!");
        return;
      }

      if (phone.length !== 10) {
        alert(
          "Introduceți un număr de telefon valid (exact 10 cifre)!"
        );
        return;
      }

      const orderData = {
        cartItems: Object.keys(cartItems).map((itemId) => ({
          productId: itemId,
          quantity: cartItems[itemId],
          weight: weights[itemId] || 1, // Default weight to 1 kg if not set
        })),
        totalAmount: getTotalAmount(),
        deliveryOption,
        address: deliveryOption === "delivery" ? address : "",
        paymentMethod,
        deliveryDateTime: {
          date: selectedDate.format("YYYY-MM-DD"),
          time: selectedTime.format("HH:mm"),
        },
        phone,
      };

      const response = await createOrder(orderData);

      if (response && response.success) {
        console.log("Comanda a fost plasată cu succes", response);
        setOrderMessage(response.message);
      } else {
        console.error(
          "Eroare la plasarea comenzii:",
          response ? response.message : "Eroare necunoscută"
        );
        setOrderMessage(
          "Eroare la plasarea comenzii: " +
            (response ? response.message : "Eroare necunoscută")
        );
      }
    } catch (error) {
      console.error("Eroare la crearea comenzii:", error.message);
      setOrderMessage("Eroare la plasarea comenzii");
    }
  };

  const handlePhoneChange = (e) => {
    let inputPhone = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (inputPhone.length > 10) {
      inputPhone = inputPhone.slice(0, 10); // Limit to 10 digits
    }
    setPhone(inputPhone);
  };

  const handleWeightChange = (itemId, value) => {
    setWeights((prevWeights) => ({ ...prevWeights, [itemId]: value }));
  };

  const getTotalAmount = () => {
    return all_products.reduce((total, product) => {
      const quantity = cartItems[product.id];
      const weight = weights[product.id] || 1;
      if (quantity > 0) {
        total += product.new_price * quantity * weight;
      }
      return total;
    }, 0);
  };

  const calculateDeliveryFee = (option) => {
    // Implement logic to calculate delivery fee based on conditions
    if (option === "pickup") {
      return 0; // Free for pickup
    } else if (option === "delivery") {
      // Example logic: Free delivery for orders over 300 lei, otherwise 30 lei
      return getTotalAmount() >= 300 ? 0 : 15;
    }
    return 0; // Default to free delivery
  };

  if (!all_products) {
    // Handle loading state or waiting for listproduct data
    return <div>Loading...</div>;
  }

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p>Produs</p>
        <p>Titlu</p>
        <p>Pret</p>
        <p>Buc</p>
        <p>KG</p>
        <p>Total</p>
        <p></p> {/* Empty space for the remove icon */}
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItems[e.id] > 0) {
          const weight = weights[e.id] || 1;
          return (
            <div key={e.id}>
              <div className="cartitems-item">
                <img
                  src={e.images[0]}
                  alt=""
                  className="cartitems-product-image"
                />
                <p>{e.name}</p>
                <p>{e.new_price} lei</p>
                <div className="cartitems-quantity">
                  <button
                    onClick={() => addToCart(e.id, -1)}
                    disabled={cartItems[e.id] <= 1}
                  >
                    -
                  </button>
                  <span>{cartItems[e.id]}</span>
                  <button onClick={() => addToCart(e.id, 1)}>+</button>
                </div>
                <Select
                  defaultValue={weight}
                  style={{ width: 60 }}
                  onChange={(value) => handleWeightChange(e.id, value)}
                >
                  <Option value={1}>1 kg</Option>
                  <Option value={2}>2 kg</Option>
                  <Option value={3}>3 kg</Option>
                  <Option value={4}>4 kg</Option>
                  <Option value={5}>5 kg</Option>
                </Select>
                <p>{e.new_price * cartItems[e.id] * weight} lei</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-footer">
        <div className="cartitems-total">
          <h1>Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalAmount()} lei</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Taxa de livrare</p>
              <p>{deliveryFee === 0 ? "Gratuit" : `${deliveryFee} lei`}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{getTotalAmount() + deliveryFee} lei</h3>
            </div>
          </div>
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="pickup"
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
              />
              Ridicare la magazin
            </label>
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
              />
              Livrare
            </label>
            {deliveryOption === "delivery" && (
              <div className="delivery-address">
                <label htmlFor="address">Adresa de livrare: (Doar în Reghin)</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Introduceți adresa de livrare str,bloc,apartament,nr..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="cartitems-address"
                />
              </div>
            )}
          </div>
          <div className="cartitems-datetime">
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              disabledDate={(current) =>
                current && current < moment().add(5, "days")
              }
              placeholder="Selectați data"
              style={{ marginRight: "10px" }}
            />
            <TimePicker
              value={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23]}
              format="HH:mm"
              placeholder="Selectați ora"
            />
          </div>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              Cash
            </label>
            {/* Other payment options can be added similarly */}
            <Input
              placeholder="Introduceți numărul de telefon (doar din RO)"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
              style={{ marginTop: "10px" }}
            />
          </div>
          <button onClick={handleCreateOrder}>Plasează comanda</button>
          {orderMessage && <p>{orderMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
