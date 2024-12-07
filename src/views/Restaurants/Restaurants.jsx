import React from 'react';
import { RestaurantProvider } from '../../contexts/RestaurantContext';
import RestaurantList from '../../components/specific/restaurants/RestaurantList';
import './Restaurants.css';

const RestaurantsPage = () => {
  return (
    <RestaurantProvider>
      <div className="restaurants-page">
        <h1>Gestión de Restaurantes</h1>
        <RestaurantList />
      </div>
    </RestaurantProvider>
  );
};

export default RestaurantsPage;
