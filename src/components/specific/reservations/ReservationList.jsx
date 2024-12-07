import React from 'react';
import './ReservationList.css';
import { Card, Title } from '../../common';
import { useAppContext } from '../../../contexts/AppContext';

const ReservationList = ({ reservations }) => {
  const { selectedReservation, setSelectedReservation } = useAppContext();

  const handleReservationClick = (reservation) => {
    console.log('Selected reservation:', reservation);
    setSelectedReservation(reservation);
  };

  if (!reservations?.length) {
    return (
      <Card
        card-header={<Title>Reservations</Title>}
        card-body={<div className="message">No reservations found for this restaurant</div>}
        card-footer={<div>Total: 0 reservations</div>}
      />
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

  const header = (
    <Title>Reservations List</Title>
  );

  const body = (
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

  const footer = (
    <div className="list-summary">
      <span>Total: {reservations.length} reservations</span>
    </div>
  );

  return (
    <Card
      card-header={header}
      card-body={body}
      card-footer={footer}
    />
  );
};

export default ReservationList;
