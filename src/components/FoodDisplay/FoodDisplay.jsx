import { useContext, useState, useRef, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import Notification from "../../pages/Notification/Notification";
import { useNavigate } from 'react-router-dom';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [notificationProducts, setNotificationProducts] = useState([]);
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // Hook for navigation

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = food_list.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredFoods(filtered);
        setIsDropdownVisible(value.length > 0 && filtered.length > 0);
    };

    const handleFoodSelect = (food) => {
        setIsDropdownVisible(false);
    };

    const handleAddToCart = (food) => {
        setNotificationProducts((prev) => {
            const existingProduct = prev.find(item => item._id === food._id);
            
            if (existingProduct) {
                // If it exists, increment the quantity
                return prev.map(item =>
                    item._id === food._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // Otherwise, add the new product with quantity 1
            return [...prev, { ...food, quantity: 1 }];
        });
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredFoods([]);
        setIsDropdownVisible(false);
    };

    const handleCloseNotification = () => {
        setNotificationProducts([]);
    };

    const handleCheckout = () => {
        navigate('/cart');
    };

    const handleIncreaseQuantity = (id) => {
        setNotificationProducts((prev) => 
            prev.map(item =>
                item._id === id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            )
        );
    };

    const handleDecreaseQuantity = (id) => {
        setNotificationProducts((prev) => 
            prev.map(item =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='food-display'>
            <h2>Top dishes near you</h2>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search for dishes...'
                    value={searchTerm}
                    onChange={handleInputChange}
                    className='search-input'
                />
                <button onClick={handleClearSearch} className='clear-button'>Clear</button>
            </div>

            {isDropdownVisible && filteredFoods.length > 0 && (
                <div className='dropdown' ref={dropdownRef}>
                    {filteredFoods.map((food) => (
                        <div 
                            key={food._id} 
                            className='dropdown-item' 
                            onClick={() => handleFoodSelect(food)}
                        >
                            {food.name}
                        </div>
                    ))}
                </div>
            )}

            <div className="food-display-list">
                {food_list.map((item) => {
                    const isRelated = searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase());

                    if ((category === "All" || category === item.category) && (isRelated || searchTerm === '')) {
                        return (
                            <div key={item._id}>
                                <FoodItem 
                                    id={item._id} 
                                    name={item.name} 
                                    description={item.description} 
                                    price={item.price} 
                                    image={item.image} 
                                    onAddToCart={() => handleAddToCart(item)} 
                                    onIncreaseQuantity={handleIncreaseQuantity} // Pass function
                                    onDecreaseQuantity={handleDecreaseQuantity} // Pass function
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {notificationProducts.length > 0 && (
                <Notification
                    products={notificationProducts}
                    onClose={handleCloseNotification}
                    onCheckout={handleCheckout}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                />
            )}
        </div>
    );
};

export default FoodDisplay;
