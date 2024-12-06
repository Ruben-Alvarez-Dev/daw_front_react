import React, { useState, useEffect } from 'react';
import './TableForm.css';
import { Title, Button, Input, Select } from '../../common';
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

    const tableData = {
      ...formData,
      restaurantId: selectedRestaurant.id,
      capacity: parseInt(formData.capacity)
    };

    try {
      const url = table
        ? `http://localhost:3000/tables/${table.id}`
        : 'http://localhost:3000/tables';
      
      const response = await fetch(url, {
        method: table ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tableData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${table ? 'update' : 'create'} table`);
      }

      onSaved();
      if (!table) {
        setFormData({
          ...initialFormState,
          zone: selectedZone === 'all' ? '' : selectedZone
        });
      }
    } catch (err) {
      console.error('Error saving table:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!table || !window.confirm('Are you sure you want to delete this table?')) {
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
      setFormData({
        ...initialFormState,
        zone: selectedZone === 'all' ? '' : selectedZone
      });
    } catch (err) {
      console.error('Error deleting table:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedRestaurant) {
    return (
      <div className="table-form-container">
        <Title>Table Form</Title>
        <p className="table-no-restaurant">Please select a restaurant first</p>
      </div>
    );
  }

  return (
    <div className="table-form-container">
      <Title>{table ? 'Edit Table' : 'New Table'}</Title>
      
      <form onSubmit={handleSubmit} className="table-form">
        <div className="table-form-group">
          <Input
            label="Table Number"
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="table-form-group">
          <Input
            label="Capacity"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>

        <div className="table-form-group">
          <Input
            label="Zone"
            type="text"
            name="zone"
            value={formData.zone}
            onChange={handleInputChange}
            required
            disabled={selectedZone !== 'all'}
          />
        </div>

        <div className="table-form-group">
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
          </Select>
        </div>

        {error && <div className="table-form-error">{error}</div>}

        <div className="table-button-group">
          <Button
            type="submit"
            disabled={loading}
            primary
            className="table-update-button"
          >
            {loading ? 'Saving...' : (table ? 'Update Table' : 'Create Table')}
          </Button>

          {table && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              danger
              className="table-delete-button"
            >
              {loading ? 'Deleting...' : 'Delete Table'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TableForm;
