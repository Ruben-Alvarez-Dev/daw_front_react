import React from 'react';
import styles from './RestaurantList.module.css';
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
      open: styles.statusOpen,
      closed: styles.statusClosed,
      temporarily_closed: styles.statusTemporary
    };
    return <span className={`${styles.status} ${statusClasses[status] || ''}`}>{status}</span>;
  };

  if (!restaurants?.length) {
    return (
      <Card>
        <div className={styles.noRestaurants}>No restaurants found</div>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Restaurants</Title>
      <div className={styles.list}>
        {restaurants.map(restaurant => (
          <div
            key={restaurant.id}
            className={`${styles.restaurantCard} ${selectedRestaurant?.id === restaurant.id ? styles.selected : ''}`}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <div className={styles.header}>
              <h3 className={styles.name}>{restaurant.name}</h3>
              {renderStatus(restaurant.status)}
            </div>
            <div className={styles.info}>
              <p className={styles.address}>{restaurant.address}</p>
              <p className={styles.phone}>{restaurant.phone}</p>
              <p className={styles.cuisine}>Cuisine: {restaurant.cuisine}</p>
              <p className={styles.rating}>Rating: {restaurant.rating}</p>
              <div className={styles.zones}>
                <span className={styles.zonesLabel}>Zones:</span>
                <div className={styles.zonesList}>
                  {(restaurant.zones || ['main']).map(zone => (
                    <span key={zone} className={styles.zoneTag}>
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
