const API_URL = 'http://localhost:3000';

export const getReservations = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_URL}/reservations?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch reservations');
  return response.json();
};

export const getReservationById = async (id) => {
  const response = await fetch(`${API_URL}/reservations/${id}`);
  if (!response.ok) throw new Error('Failed to fetch reservation');
  return response.json();
};

export const createReservation = async (reservationData) => {
  const response = await fetch(`${API_URL}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationData),
  });
  if (!response.ok) throw new Error('Failed to create reservation');
  return response.json();
};

export const updateReservation = async (id, reservationData) => {
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservationData),
  });
  if (!response.ok) throw new Error('Failed to update reservation');
  return response.json();
};

export const deleteReservation = async (id) => {
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete reservation');
  return true;
};
