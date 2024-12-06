import React, { useState, useEffect } from 'react';
import styles from './RestaurantForm.module.css';
import { Card, Title, Button } from '../../common';

const initialFormState = {
  name: '',
  address: '',
  phone: '',
  cuisine: 'italian',
  status: 'open',
  rating: '4.0'
};

const RestaurantForm = ({ selectedRestaurant, onRestaurantSaved, onRestaurantDeleted }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRestaurant) {
      setFormData({
        name: selectedRestaurant.name || '',
        address: selectedRestaurant.address || '',
        phone: selectedRestaurant.phone || '',
        cuisine: selectedRestaurant.cuisine || 'italian',
        status: selectedRestaurant.status || 'open',
        rating: selectedRestaurant.rating?.toString() || '4.0'
      });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedRestaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = '/api/restaurants';
      const method = selectedRestaurant ? 'PATCH' : 'POST';
      const finalUrl = selectedRestaurant ? `${url}/${selectedRestaurant.id}` : url;

      const dataToSend = {
        ...formData,
        rating: parseFloat(formData.rating)
      };

      const response = await fetch(finalUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedRestaurant = await response.json();
      if (onRestaurantSaved) {
        onRestaurantSaved(savedRestaurant);
      }
      
      if (!selectedRestaurant) {
        setFormData(initialFormState);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRestaurant) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/restaurants/${selectedRestaurant.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (onRestaurantDeleted) {
        onRestaurantDeleted();
      }
      
      setFormData(initialFormState);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>{selectedRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}</Title>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cuisine">Cuisine</label>
          <select
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
          >
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="indian">Indian</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            required
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.buttonGroup}>
          <Button 
            type="submit" 
            disabled={loading}
            className={styles.updateButton}
          >
            {selectedRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
          </Button>

          {selectedRestaurant && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className={styles.deleteButton}
            >
              Delete Restaurant
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default RestaurantForm;
