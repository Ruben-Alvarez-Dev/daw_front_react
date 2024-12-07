import React, { useState, useEffect } from 'react';
import { Card, Title } from '../../common';
import { useRestaurantContext } from '../../../contexts/RestaurantContext';
import * as restaurantService from '../../../services/restaurantService';
import RestaurantForm from './RestaurantForm';
import './RestaurantList.css';

const RestaurantList = () => {
  // Estado local del componente
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado compartido del contexto
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurantContext();

  // Cargar restaurantes al montar el componente
  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      try {
        const data = await restaurantService.getRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const renderStatus = (status) => {
    const statusClasses = {
      open: 'status-open',
      closed: 'status-closed',
      temporarily_closed: 'status-temporary'
    };
    return <span className={`status ${statusClasses[status] || ''}`}>{status}</span>;
  };

  if (loading) return <div className="loading">Loading restaurants...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="two-columns-container">
      <Card>
        <Title>Restaurants</Title>
        {!restaurants?.length ? (
          <div className="no-restaurants">No restaurants found</div>
        ) : (
          <table className="restaurants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  key={restaurant.id}
                  onClick={() => handleRestaurantClick(restaurant)}
                  className={selectedRestaurant?.id === restaurant.id ? 'selected' : ''}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.phone}</td>
                  <td>{renderStatus(restaurant.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <Card>
        <Title>Restaurant Details</Title>
        <RestaurantForm onRestaurantSaved={() => {
          // Recargar la lista cuando se guarde un restaurante
          restaurantService.getRestaurants().then(setRestaurants);
        }} />
      </Card>
    </div>
  );
};

export default RestaurantList;
