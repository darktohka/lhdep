import React, { useContext, useState } from 'react';
import { HomeContext } from './HomeContextProvider';

const OrderComponent = () => {
  const { createOrder } = useContext(HomeContext);
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [orderMessage, setOrderMessage] = useState('');

  const handleCreateOrder = async () => {
    try {
      // VerificÄ dacÄ sunt setate selectedDate, selectedTime Č™i phone
      if (!selectedDate || !selectedTime || !phone) {
        alert("SelectaČ›i data, ora Č™i introduceČ›i numÄrul de telefon pentru ridicare/livrare!");
        return;
      }

      // Expresia regulatÄ simplificatÄ pentru orice numÄr de telefon de 10 cifre
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        alert("IntroduceČ›i un numÄr de telefon valid (exact 10 cifre)!");
        return;
      }

      // PregÄteČ™te datele comenzii
      const orderData = {
        cartItems: [{ productId: '1', quantity: 2 }, { productId: '2', quantity: 1 }],
        totalAmount: 150,
        deliveryOption: 'delivery',
        address: 'Strada Exemplu, Nr. 123',
        paymentMethod: 'card',
        deliveryDateTime: {
          date: selectedDate.format('YYYY-MM-DD'),
          time: selectedTime.format('HH:mm')
        },
        phone: phone,
      };

      // ApeleazÄ funcČ›ia createOrder din context
      const response = await createOrder(orderData);
      console.log('Response from createOrder:', response); // Log the response

      if (response && response.success) {
        console.log('Comanda a fost plasată cu succes', response);
        setOrderMessage(response.message); // Update state with success message
      } else {
        console.error('Eroare la plasarea comenzii:', response ? response.message : 'Eroare necunoscută');
        setOrderMessage('Eroare la plasarea comenzii: ' + (response ? response.message : 'Eroare necunoscută'));
      }
    } catch (error) {
      console.error('Eroare la crearea comenzii:', error.message);
      setOrderMessage('Eroare la plasarea comenzii');
    }
  };

  const handlePhoneChange = (e) => {
    let inputPhone = e.target.value.replace(/\D/g, ''); // EliminÄ caracterele non-numerice
    if (inputPhone.length > 10) {
      inputPhone = inputPhone.slice(0, 10); // LimitÄ la 10 cifre
    }
    setPhone(inputPhone);
  };

  return (
    <div className="order-component">
      <input
        type="text"
        placeholder="IntroduceČ›i numÄrul de telefon (10 cifre)"
        value={phone}
        onChange={handlePhoneChange}
        maxLength={10}
      />
      <button onClick={handleCreateOrder}>PlaseazÄ comanda</button>
      {orderMessage && <p>{orderMessage}</p>}
    </div>
  );
};

export default OrderComponent;
