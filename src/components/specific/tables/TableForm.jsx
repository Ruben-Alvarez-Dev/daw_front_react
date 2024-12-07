import React, { useState, useEffect } from 'react';
import './TableForm.css';
import { Title, Button, Input, Select, Card } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const TableForm = ({ table, onSaved }) => {
  const { selectedRestaurant, selectedZone } = useAppContext();
  const initialFormState = {
    number: '',
    capacity: '',
    zone: selectedZone === 'all' ? '' : selectedZone,
    status: 'available'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (table) {
      setFormData({
        number: table.number,
        capacity: table.capacity,
        zone: table.zone,
        status: table.status
      });
      setError(null);
    } else {
      setFormData({
        ...initialFormState,
        zone: selectedZone === 'all' ? '' : selectedZone
      });
    }
  }, [table, selectedZone]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.number.trim()) return 'Table number is required';
    if (!formData.capacity) return 'Capacity is required';
    if (!formData.zone) return 'Zone is required';
    if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
      return 'Capacity must be a positive number';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `http://localhost:3000/tables${table ? `/${table.id}` : ''}`;
      const method = table ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          restaurantId: selectedRestaurant.id,
          capacity: parseInt(formData.capacity)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save table');
      }

      const savedTable = await response.json();
      if (onSaved) onSaved(savedTable);
      
      if (!table) {
        setFormData(initialFormState);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const header = (
    <Title>{table ? 'Edit Table' : 'Add New Table'}</Title>
  );

  const body = (
    <form onSubmit={handleSubmit} className="table-form">
      <Input
        label="Table Number"
        type="text"
        name="number"
        value={formData.number}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Capacity"
        type="number"
        name="capacity"
        value={formData.capacity}
        onChange={handleInputChange}
        required
        min="1"
      />
      <Select
        label="Zone"
        name="zone"
        value={formData.zone}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Zone</option>
        {selectedRestaurant?.zones?.map(zone => (
          <option key={zone} value={zone}>{zone}</option>
        ))}
      </Select>
      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        required
      >
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
        <option value="reserved">Reserved</option>
        <option value="maintenance">Maintenance</option>
      </Select>
      {error && <div className="error-message">{error}</div>}
    </form>
  );

  const footer = (
    <div className="form-actions">
      <Button type="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : (table ? 'Update Table' : 'Create Table')}
      </Button>
      {table && (
        <Button
          type="button"
          onClick={async () => {
            if (!window.confirm('Are you sure you want to delete this table?')) {
              return;
            }

            setLoading(true);
            setError(null);

            try {
              const response = await fetch(`http://localhost:3000/tables/${table.id}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error('Failed to delete table');
              }

              onSaved();
              setFormData(initialFormState);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          danger
        >
          {loading ? 'Deleting...' : 'Delete Table'}
        </Button>
      )}
    </div>
  );

  if (!selectedRestaurant) {
    return (
      <div className="table-form-container">
        <Title>Table Form</Title>
        <p className="table-no-restaurant">Please select a restaurant first</p>
      </div>
    );
  }

  return (
    <Card
      card-header={header}
      card-body={body}
      card-footer={footer}
    />
  );
};

export default TableForm;
