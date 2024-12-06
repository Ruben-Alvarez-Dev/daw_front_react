import React, { useState } from 'react';
import styles from './Reservations.module.css';
import RestaurantSelector from '../tables/RestaurantSelector';
import UserSelector from './UserSelector';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import { useAppContext } from '../../../context/AppContext';

const Reservations = () => {
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    selectedUser,
    setSelectedUser
  } = useAppContext();
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedReservation(null);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedReservation(null);
  };

  const handleReservationSelect = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleReservationSaved = () => {
    setSelectedReservation(null);
  };

  const handleReservationDeleted = () => {
    setSelectedReservation(null);
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.sectionsContainer}>
        <div className={styles.section}>
          <h2>Select Restaurant</h2>
          <RestaurantSelector
            onSelectRestaurant={handleRestaurantSelect}
            selectedRestaurant={selectedRestaurant}
          />
        </div>
        <div className={styles.section}>
          <h2>Select User</h2>
          <UserSelector
            onSelectUser={handleUserSelect}
            selectedUser={selectedUser}
          />
        </div>
        <div className={styles.section}>
          <h2>Reservations</h2>
          <ReservationList
            restaurantId={selectedRestaurant?.id}
            onSelectReservation={handleReservationSelect}
            selectedReservation={selectedReservation}
          />
        </div>
        <div className={styles.section}>
          <h2>New Reservation</h2>
          <ReservationForm
            selectedRestaurant={selectedRestaurant}
            selectedUser={selectedUser}
            selectedReservation={selectedReservation}
            onReservationSaved={handleReservationSaved}
            onReservationDeleted={handleReservationDeleted}
          />
        </div>
      </div>
    </div>
  );
};

export default Reservations;
