import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image, onAddToCart }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const navigate = useNavigate();

    const quantity = cartItems[id] || 0;
    const totalPrice = (price * quantity).toFixed(2);

    const handleOrderClick = () => {
        navigate('/order');
    };

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-image' src={image} alt={name} />
                <div className='food-item-counter'>
                    {!quantity ? (
                        <img
                            className='add'
                            onClick={() => {
                                addToCart(id);
                                onAddToCart(); // Trigger the popup when added to cart
                            }}
                            src={assets.add_icon_white}
                            alt="Add to Cart"
                            aria-label="Add to Cart"
                        />
                    ) : (
                        <>
                            <img
                                src={assets.remove_icon_red}
                                onClick={() => {
                                    removeFromCart(id);
                                    // Optional: if you want to show a notification or update state when removing
                                }}
                                alt="Remove from Cart"
                                aria-label="Remove from Cart"
                            />
                            <p>{quantity}</p>
                            <img
                                src={assets.add_icon_green}
                                onClick={() => addToCart(id)} // Call addToCart to increase quantity
                                alt="Increase Quantity"
                                aria-label="Increase Quantity"
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating Stars" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">Price: ${price.toFixed(2)}</p>
                {quantity > 0 && (
                    <p className="food-item-total-price">Total: ${totalPrice}</p>
                )}
                
                <div className="order-container">
                    <button className='order-button' onClick={handleOrderClick}>
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
