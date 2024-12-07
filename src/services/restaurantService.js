const API_URL = 'http://localhost:3000';

export const getRestaurants = async () => {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) throw new Error('Failed to fetch restaurants');
  return response.json();
};

export const getRestaurantById = async (id) => {
  const response = await fetch(`${API_URL}/restaurants/${id}`);
  if (!response.ok) throw new Error('Failed to fetch restaurant');
  return response.json();
};

export const createRestaurant = async (restaurantData) => {
  const response = await fetch(`${API_URL}/restaurants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurantData),
  });
  if (!response.ok) throw new Error('Failed to create restaurant');
  return response.json();
};

export const updateRestaurant = async (id, restaurantData) => {
  const response = await fetch(`${API_URL}/restaurants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurantData),
  });
  if (!response.ok) throw new Error('Failed to update restaurant');
  return response.json();
};

export const deleteRestaurant = async (id) => {
  const response = await fetch(`${API_URL}/restaurants/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete restaurant');
  return true;
};
