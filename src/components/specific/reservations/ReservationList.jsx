import React from 'react';
import styles from './ReservationList.module.css';
import { Card } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const ReservationList = ({ reservations }) => {
  const { selectedReservation, setSelectedReservation } = useAppContext();

  const handleReservationClick = (reservation) => {
    console.log('Selected reservation:', reservation);
    setSelectedReservation(reservation);
  };

  if (!reservations?.length) {
    return (
      <div className={styles.message}>
        No reservations found for this restaurant
      </div>
    );
  }

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit'
      })
    };
  };

  return (
    <div className={styles.reservationList}>
      {reservations.map((reservation) => {
        const { date, time } = formatDateTime(reservation.date);
        return (
          <Card
            key={reservation.id}
            onClick={() => handleReservationClick(reservation)}
            className={`${styles.reservationCard} ${
              selectedReservation?.id === reservation.id ? styles.selected : ''
            }`}
          >
            <div className={styles.reservationInfo}>
              <div className={styles.dateTime}>
                <span>{date}</span>
                <span>{time}</span>
              </div>
              <div className={styles.details}>
                <span>Guests: {reservation.numberOfGuests}</span>
                <span className={`${styles.status} ${styles[reservation.status]}`}>
                  {reservation.status}
                </span>
              </div>
              {reservation.notes && (
                <div className={styles.notes}>{reservation.notes}</div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ReservationList;
