import React from 'react';
import './Reservations.css';
import Reservations from '../../components/specific/reservations/Reservations';

const ReservationsView = () => {
  return (
    <div className="reservations-view">
      <h1>Reservations</h1>
      <div className="reservations-container">
        <Reservations />
      </div>
    </div>
  );
};

export default ReservationsView;
