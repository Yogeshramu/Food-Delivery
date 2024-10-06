import React, { useEffect } from 'react';
import './Notification.css'; // Ensure this file exists for styles

const Notification = ({ products, onClose, onCheckout, onIncreaseQuantity, onDecreaseQuantity }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Automatically close after 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className='notification-box'>
            <h3>Items Added to Cart!</h3>
            <div className="notification-content">
                {products.map(product => (
                    <div key={product._id} className="notification-item">
                        <p>{product.name}</p>
                        <div className="quantity-controls">
                            <button onClick={() => onDecreaseQuantity(product._id)}>-</button>
                            <span>Quantity: {product.quantity}</span>
                            <button onClick={() => onIncreaseQuantity(product._id)}>+</button>
                        </div>
                        <p>Price: ${(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <button onClick={onCheckout} className="checkout-button">Checkout</button>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );
};

export default Notification;
