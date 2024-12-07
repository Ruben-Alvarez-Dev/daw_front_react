const BASE_URL = 'http://localhost:3000';

export const restaurantService = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/restaurants`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  create: async (restaurantData) => {
    const response = await fetch(`${BASE_URL}/restaurants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  update: async (restaurantId, restaurantData) => {
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurantData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  delete: async (restaurantId) => {
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
};
