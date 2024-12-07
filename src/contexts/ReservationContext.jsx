import React, { createContext, useContext, useState, useCallback } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reservationFilters, setReservationFilters] = useState({
    status: '',
    date: '',
    restaurantId: '',
    tableId: '',
    userId: '',
    search: ''
  });

  const fetchReservations = useCallback(async (params = {}) => {
    try {
      // TODO: Implement API call with query params
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/reservations?${queryString}`);
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  }, []);

  const createReservation = useCallback(async (reservationData) => {
    try {
      // TODO: Implement API call
      const response = await fetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify(reservationData),
      });
      const newReservation = await response.json();
      setReservations(prev => [...prev, newReservation]);
      return newReservation;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }, []);

  const updateReservation = useCallback(async (reservationId, reservationData) => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'PUT',
        body: JSON.stringify(reservationData),
      });
      const updatedReservation = await response.json();
      setReservations(prev => prev.map(reservation => 
        reservation.id === reservationId ? updatedReservation : reservation
      ));
      return updatedReservation;
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  }, []);

  const deleteReservation = useCallback(async (reservationId) => {
    try {
      // TODO: Implement API call
      await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      setReservations(prev => prev.filter(reservation => reservation.id !== reservationId));
      if (selectedReservation?.id === reservationId) {
        setSelectedReservation(null);
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  }, [selectedReservation?.id]);

  const filterReservations = useCallback((filters) => {
    setReservationFilters(prev => ({ ...prev, ...filters }));
  }, []);

  const checkAvailability = useCallback(async (params) => {
    try {
      // TODO: Implement API call
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/reservations/check-availability?${queryString}`);
      return await response.json();
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  }, []);

  const value = {
    reservations,
    selectedReservation,
    reservationFilters,
    setSelectedReservation,
    fetchReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    filterReservations,
    checkAvailability,
  };

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
};

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservationContext must be used within a ReservationProvider');
  }
  return context;
};

export default ReservationContext;
