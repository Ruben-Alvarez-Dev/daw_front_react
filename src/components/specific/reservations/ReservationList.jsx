import React from 'react';
import './ReservationList.css';
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
      <div className="message">
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
    <div className="reservation-list">
      {reservations.map((reservation) => {
        const { date, time } = formatDateTime(reservation.date);
        return (
          <Card
            key={reservation.id}
            onClick={() => handleReservationClick(reservation)}
            className={`reservation-card ${selectedReservation?.id === reservation.id ? 'selected' : ''}`}
          >
            <div className="reservation-info">
              <div className="date-time">
                <span>{date}</span>
                <span>{time}</span>
              </div>
              <div className="details">
                <span>Guests: {reservation.numberOfGuests}</span>
                <span className={`status ${reservation.status}`}>
                  {reservation.status}
                </span>
              </div>
              {reservation.notes && (
                <div className="notes">{reservation.notes}</div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ReservationList;
