import React, { useState, useEffect } from 'react';
import './Reservations.css';
import RestaurantSelector from '../restaurants/RestaurantSelector';
import UserSelector from './UserSelector';
import ReservationList from './ReservationList';
import ReservationForm from './ReservationForm';
import { useAppContext } from '../../../context/AppContext';

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
      <div className="selectors">
        <div className="selector-section">
          <RestaurantSelector />
        </div>
        <div className="selector-section">
          <UserSelector />
        </div>
      </div>
      
      {selectedRestaurant && (
        <div className="content">
          <div className="list-section">
            {loading ? (
              <div>Loading reservations...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <ReservationList reservations={reservations} />
            )}
          </div>
          <div className="form-section">
            <ReservationForm
              selectedReservation={selectedReservation}
              onReservationSaved={handleReservationSaved}
              onReservationDeleted={handleReservationDeleted}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
