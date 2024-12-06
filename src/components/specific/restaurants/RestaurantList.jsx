import React from 'react';
import './RestaurantList.css';
import { Card, Title } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const RestaurantList = ({ restaurants, onSelectRestaurant }) => {
  const { selectedRestaurant, setSelectedRestaurant } = useAppContext();

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    if (onSelectRestaurant) {
      onSelectRestaurant(restaurant);
    }
  };

  const renderStatus = (status) => {
    const statusClasses = {
      open: 'status-open',
      closed: 'status-closed',
      temporarily_closed: 'status-temporary'
    };
    return <span className={`restaurant-status ${statusClasses[status] || ''}`}>{status}</span>;
  };

  if (!restaurants?.length) {
    return (
      <Card>
        <div className="no-restaurants">No restaurants found</div>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Restaurants</Title>
      <div className="restaurant-list">
        {restaurants.map(restaurant => (
          <div
            key={restaurant.id}
            className={`restaurant-card ${selectedRestaurant?.id === restaurant.id ? 'selected' : ''}`}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <div className="restaurant-header">
              <h3 className="restaurant-name">{restaurant.name}</h3>
              {renderStatus(restaurant.status)}
            </div>
            <div className="restaurant-info">
              <p className="restaurant-address">{restaurant.address}</p>
              <p className="restaurant-phone">{restaurant.phone}</p>
              <p className="restaurant-cuisine">Cuisine: {restaurant.cuisine}</p>
              <p className="restaurant-rating">Rating: {restaurant.rating}</p>
              <div className="restaurant-zones">
                <span className="zones-label">Zones:</span>
                <div className="zones-list">
                  {(restaurant.zones || ['main']).map(zone => (
                    <span key={zone} className="zone-tag">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RestaurantList;
