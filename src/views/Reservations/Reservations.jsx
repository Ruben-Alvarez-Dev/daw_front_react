import React from 'react';
import styles from './Reservations.module.css';
import Reservations from '../../components/specific/reservations/Reservations';

const ReservationsView = () => {
  return (
    <div className={styles.reservationsView}>
      <h1>Reservations</h1>
      <div className={styles.reservationsContainer}>
        <Reservations />
      </div>
    </div>
  );
};

export default ReservationsView;
