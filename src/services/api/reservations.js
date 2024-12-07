const BASE_URL = 'http://localhost:3000';

export const reservationService = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/reservations`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  getByTable: async (tableId) => {
    const response = await fetch(`${BASE_URL}/tables/${tableId}/reservations`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  create: async (reservationData) => {
    const response = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  update: async (reservationId, reservationData) => {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  delete: async (reservationId) => {
    const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
};
