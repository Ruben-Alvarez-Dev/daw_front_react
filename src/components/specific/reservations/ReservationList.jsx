import React, { useState, useEffect } from 'react';
import styles from './ReservationList.module.css';
import { Card } from '../../common';

const ReservationList = ({ restaurantId, onSelectReservation, selectedReservation }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurantId) {
      setReservations([]);
      setError(null);
      return;
    }

    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching reservations for restaurant:', restaurantId);
        const response = await fetch(`http://localhost:3000/reservations?restaurantId=${restaurantId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        
        const data = await response.json();
        console.log('Received reservations:', data);
        setReservations(data);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Could not load reservations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [restaurantId]);

  if (!restaurantId) {
    return (
      <div className={styles.message}>
        Please select a restaurant to view its reservations
      </div>
    );
  }

  if (loading) {
    return <div className={styles.message}>Loading reservations...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (reservations.length === 0) {
    return (
      <div className={styles.message}>
        No reservations found for this restaurant
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.reservationList}>
      {reservations.map((reservation) => (
        <Card
          key={reservation.id}
          onClick={() => onSelectReservation(reservation)}
          className={`${styles.reservationCard} ${
            selectedReservation?.id === reservation.id ? styles.selected : ''
          }`}
        >
          <div className={styles.reservationInfo}>
            <div className={styles.dateTime}>
              <span>{formatDate(reservation.date)}</span>
              <span>{reservation.time}</span>
            </div>
            <div className={styles.details}>
              <span>Guests: {reservation.guests}</span>
              <span className={`${styles.status} ${styles[reservation.status]}`}>
                {reservation.status}
              </span>
            </div>
            {reservation.notes && (
              <div className={styles.notes}>{reservation.notes}</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ReservationList;
