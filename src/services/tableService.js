const API_URL = 'http://localhost:3000';

export const getTables = async (restaurantId) => {
  const response = await fetch(`${API_URL}/tables?restaurantId=${restaurantId}`);
  if (!response.ok) throw new Error('Failed to fetch tables');
  return response.json();
};

export const getTableById = async (id) => {
  const response = await fetch(`${API_URL}/tables/${id}`);
  if (!response.ok) throw new Error('Failed to fetch table');
  return response.json();
};

export const createTable = async (tableData) => {
  const response = await fetch(`${API_URL}/tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tableData),
  });
  if (!response.ok) throw new Error('Failed to create table');
  return response.json();
};

export const updateTable = async (id, tableData) => {
  const response = await fetch(`${API_URL}/tables/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tableData),
  });
  if (!response.ok) throw new Error('Failed to update table');
  return response.json();
};

export const deleteTable = async (id) => {
  const response = await fetch(`${API_URL}/tables/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete table');
  return true;
};
