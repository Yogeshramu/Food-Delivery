import { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import Cart from '../PlaceOrder/PlaceOrder';


const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />

      <AppDownload />
      
      {/* Cart section with an ID for scrolling */}
      <div id='cart-section'>
        <Cart />
      </div>
    </div>
  );
};

export default Home;
