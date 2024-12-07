import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from '../../common';
import { useRestaurantContext } from '../../../contexts/RestaurantContext';
import './RestaurantForm.css';

const RestaurantForm = () => {
  const { 
    selectedRestaurant, 
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant,
    setSelectedRestaurant
  } = useRestaurantContext();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    status: 'open',
    cuisine: '',
    rating: 0,
    zones: []
  });

  useEffect(() => {
    if (selectedRestaurant) {
      setFormData(selectedRestaurant);
    } else {
      setFormData({
        name: '',
        address: '',
        phone: '',
        status: 'open',
        cuisine: '',
        rating: 0,
        zones: []
      });
    }
  }, [selectedRestaurant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRestaurant) {
        await updateRestaurant(selectedRestaurant.id, formData);
      } else {
        await createRestaurant(formData);
      }
      setSelectedRestaurant(null);
      setFormData({
        name: '',
        address: '',
        phone: '',
        status: 'open',
        cuisine: '',
        rating: 0,
        zones: []
      });
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedRestaurant && window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await deleteRestaurant(selectedRestaurant.id);
        setSelectedRestaurant(null);
        setFormData({
          name: '',
          address: '',
          phone: '',
          status: 'open',
          cuisine: '',
          rating: 0,
          zones: []
        });
      } catch (error) {
        console.error('Error deleting restaurant:', error);
      }
    }
  };

  const handleCancel = () => {
    setSelectedRestaurant(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      status: 'open',
      cuisine: '',
      rating: 0,
      zones: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="restaurant-form">
      <Input
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Address"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <Input
        label="Phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: 'open', label: 'Open' },
          { value: 'closed', label: 'Closed' },
          { value: 'temporarily_closed', label: 'Temporarily Closed' }
        ]}
      />
      <Input
        label="Cuisine"
        type="text"
        name="cuisine"
        value={formData.cuisine}
        onChange={handleChange}
      />
      <Input
        label="Rating"
        type="number"
        name="rating"
        min="0"
        max="5"
        step="0.1"
        value={formData.rating}
        onChange={handleChange}
      />
      
      <div className="form-buttons">
        <Button type="submit" variant="primary">
          {selectedRestaurant ? 'Update' : 'Create'} Restaurant
        </Button>
        {selectedRestaurant && (
          <>
            <Button type="button" variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default RestaurantForm;
