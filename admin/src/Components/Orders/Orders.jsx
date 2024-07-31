import React, { useState, useEffect } from 'react';
import './Orders.css';
import order_icon from '../../assets/Product_list_icon.svg';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders(); // Fetch orders when component mounts
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://api.littleheaven.me/admin/orders');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const finalizeOrder = async (orderId) => {
        try {
            const response = await fetch(`https://api.littleheaven.me/admin/orders/${orderId}/finalize`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Completed' }),
            });

            if (response.ok) {
                fetchOrders(); // Optionally fetch orders again to update the UI
                console.log('Order finalized successfully');
            } else {
                console.error('Failed to finalize order');
            }
        } catch (error) {
            console.error('Error finalizing order:', error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`https://api.littleheaven.me/admin/orders/${orderId}/removeorder`, {
                method: 'POST', // Using POST method for removing order
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }), // Sending orderId in the request body
            });

            if (response.ok) {
                fetchOrders(); // Fetch orders again to update the UI
                console.log('Order deleted successfully');
            } else {
                const responseData = await response.json();
                if (response.status === 400 && responseData.error === 'Cannot delete a completed order') {
                    console.log('Cannot delete a completed order');
                    // Handle this case in UI (e.g., show a message to the user)
                } else {
                    console.error('Failed to delete order:', responseData.error);
                }
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="orders">
            <h2>Orders</h2>
            <div className="orders-list">
                {orders.map((order) => (
                    <div className="order-item" key={order._id}>
                        <div className="order-item-header">
                            <img src={order_icon} alt="Order Icon" className="order-icon" />
                            <h3>Order #{order._id}</h3>
                            <p>Status: {order.status}</p>
                            <p>User ID: {order.userId._id}</p>
                            <p>User Name: {order.userId.name}</p>
                            <button
                                className={`finalize-btn ${order.status === 'Completed' ? 'completed' : ''}`}
                                onClick={() => finalizeOrder(order._id)}
                                disabled={order.status === 'Completed'}
                            >
                                {order.status === 'Completed' ? 'Finalized' : 'Finalize'}
                            </button>

                            <button className="delete-btn" onClick={() => deleteOrder(order._id)}>
                                Delete
                            </button>
                        </div>
                        <div className="order-item-details">
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p>Total Amount: {order.totalAmount} lei</p>
                            <p>Phone: {order.phone}</p>
                            {order.deliveryOption === 'delivery' && (
                                <div>
                                    <p>Address: {order.address}</p>
                                </div>
                            )}
                            <p>Scheduled Date: {new Date(order.scheduledDate).toLocaleDateString()}</p>
                            <p>Scheduled Time: {order.scheduledTime}</p>

                            <div>
                                <h4>Ordered Products:</h4>
                                <ul>
                                    {order.cartItems.map((item) => (
                                        // Afisam doar daca cantitatea este mai mare decat 0
                                        item.quantity > 0 && (
                                            <li key={item.productId}>
                                                Product ID: {item.productId}, Quantity: {item.quantity}, Weight: {item.weight} kg
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
