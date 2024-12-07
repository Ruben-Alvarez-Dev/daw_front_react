import React from 'react';
import { Card, Title } from '../../common';
import { useRestaurantContext } from '../../../contexts/RestaurantContext';
import RestaurantForm from './RestaurantForm';
import './RestaurantList.css';

const RestaurantList = () => {
  const { 
    restaurants, 
    selectedRestaurant, 
    setSelectedRestaurant, 
    loading, 
    error 
  } = useRestaurantContext();

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
        <RestaurantForm 
          selectedRestaurant={selectedRestaurant}
          onRestaurantSaved={() => {
            setSelectedRestaurant(null);
          }}
          onRestaurantDeleted={() => {
            setSelectedRestaurant(null);
          }}
        />
      </Card>
    </div>
  );
};

export default RestaurantList;
