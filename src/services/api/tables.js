const BASE_URL = 'http://localhost:3000';

export const tableService = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/tables`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  getByRestaurant: async (restaurantId) => {
    const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}/tables`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  create: async (tableData) => {
    const response = await fetch(`${BASE_URL}/tables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tableData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  update: async (tableId, tableData) => {
    const response = await fetch(`${BASE_URL}/tables/${tableId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tableData)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  delete: async (tableId) => {
    const response = await fetch(`${BASE_URL}/tables/${tableId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
};
