import React from 'react';
import RestaurantsComponent from '../../components/specific/restaurants/Restaurants';
import './Restaurants.css';

const RestaurantsPage = () => {
  return (
    <div className="restaurants-page">
      <h1>Gestión de Restaurantes</h1>
      <RestaurantsComponent />
    </div>
  );
};

export default RestaurantsPage;
