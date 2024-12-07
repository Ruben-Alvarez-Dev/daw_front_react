const API_URL = 'http://localhost:3000';

const getAll = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

const getById = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

const create = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

const update = async (id, userData) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

const remove = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return true;
};

export const userService = {
  getAll,
  getById,
  create,
  update,
  remove
};
