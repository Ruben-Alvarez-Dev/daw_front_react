import React, { useState, useEffect } from 'react';
import './Reservations.css';
import UserSelector from './UserSelector';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import { useAppContext } from '../../../contexts/AppContext';

const Reservations = () => {
  const { 
    selectedRestaurant,
    selectedUser,
    selectedReservation, 
    setSelectedReservation 
  } = useAppContext();
  
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchReservations();
    } else {
      setReservations([]);
    }
  }, [selectedRestaurant]);

  const fetchReservations = async () => {
    if (!selectedRestaurant) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000/reservations?restaurantId=${selectedRestaurant.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReservations(data);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError(`Error loading reservations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReservationSaved = () => {
    setSelectedReservation(null);
    fetchReservations();
  };

  const handleReservationDeleted = () => {
    setSelectedReservation(null);
    fetchReservations();
  };

  return (
    <div className="reservations-container">
      <div className="reservations-main-content">
        <div className="reservations-left-section">
          <UserSelector />
        </div>
        <div className="reservations-right-section">
          <ReservationList 
            reservations={reservations}
            loading={loading}
            error={error}
            onSelect={setSelectedReservation}
          />
          {selectedRestaurant && selectedUser && (
            <ReservationForm 
              reservation={selectedReservation}
              onSubmitSuccess={fetchReservations}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
