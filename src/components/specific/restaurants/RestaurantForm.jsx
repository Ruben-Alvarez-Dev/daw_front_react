import React, { useState, useEffect } from 'react';
import './RestaurantForm.css';
import { Card, Title, Button, Input, Select } from '../../common';

const initialFormState = {
  name: '',
  address: '',
  phone: '',
  cuisine: 'italian',
  status: 'open',
  rating: '4.0',
  zones: ['main'] // Zona por defecto
};

const RestaurantForm = ({ selectedRestaurant, onRestaurantSaved, onRestaurantDeleted }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [newZone, setNewZone] = useState('');
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
        rating: selectedRestaurant.rating?.toString() || '4.0',
        zones: selectedRestaurant.zones || ['main']
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

  const handleAddZone = (e) => {
    e.preventDefault();
    if (newZone.trim() && !formData.zones.includes(newZone.trim())) {
      setFormData(prev => ({
        ...prev,
        zones: [...prev.zones, newZone.trim()]
      }));
      setNewZone('');
    }
  };

  const handleRemoveZone = (zoneToRemove) => {
    if (zoneToRemove === 'main') return;
    setFormData(prev => ({
      ...prev,
      zones: prev.zones.filter(zone => zone !== zoneToRemove)
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
      <form onSubmit={handleSubmit} className="restaurant-form">
        <div className="form-group">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <Input
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <Input
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <Select
            label="Cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            required
          >
            <option value="italian">Italian</option>
            <option value="japanese">Japanese</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="indian">Indian</option>
          </Select>
        </div>

        <div className="form-group">
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </Select>
        </div>

        <div className="form-group">
          <Input
            label="Rating"
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            min="0"
            max="5"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Zones</label>
          <div className="zones-list">
            {formData.zones.map(zone => (
              <div key={zone} className="zone-tag">
                {zone}
                {zone !== 'main' && (
                  <button
                    type="button"
                    onClick={() => handleRemoveZone(zone)}
                    className="remove-zone"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="add-zone">
            <Input
              type="text"
              value={newZone}
              onChange={(e) => setNewZone(e.target.value)}
              placeholder="New zone name"
            />
            <Button type="button" onClick={handleAddZone}>
              Add Zone
            </Button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="button-group">
          <Button 
            type="submit" 
            disabled={loading}
            className="update-button"
          >
            {selectedRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
          </Button>

          {selectedRestaurant && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="delete-button"
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
