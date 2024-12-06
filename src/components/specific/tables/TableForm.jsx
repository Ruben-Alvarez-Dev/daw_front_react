import React, { useState, useEffect } from 'react';
import styles from './TableForm.module.css';
import { Card, Title, Button } from '../../common';

const initialFormState = {
  number: '',
  zone: '',
  capacity: '4',
  status: 'available'
};

const TableForm = ({ selectedRestaurant, selectedTable, onTableSaved, onTableDeleted }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedTable) {
      setFormData({
        number: selectedTable.number.toString(),
        zone: selectedTable.zone,
        capacity: selectedTable.capacity.toString(),
        status: selectedTable.status
      });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedTable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRestaurant) {
      setError('Please select a restaurant first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = '/api/tables';
      const method = selectedTable ? 'PATCH' : 'POST';
      const finalUrl = selectedTable ? `${url}/${selectedTable.id}` : url;

      const dataToSend = {
        ...formData,
        restaurantId: selectedRestaurant.id,
        number: parseInt(formData.number),
        capacity: parseInt(formData.capacity)
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

      const savedTable = await response.json();
      if (onTableSaved) {
        onTableSaved(savedTable);
      }
      
      if (!selectedTable) {
        setFormData(initialFormState);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTable) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/tables/${selectedTable.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (onTableDeleted) {
        onTableDeleted();
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
      <Title>{selectedTable ? 'Edit Table' : 'Add Table'}</Title>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="number">Table Number</label>
          <input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        {selectedRestaurant && (
          <div className={styles.formGroup}>
            <label htmlFor="zone">Zone</label>
            <select
              id="zone"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              required
            >
              <option value="">Select a zone</option>
              {selectedRestaurant.zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            min="1"
            max="12"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
          </select>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.buttonGroup}>
          <Button 
            type="submit" 
            disabled={loading || !selectedRestaurant}
            className={styles.updateButton}
          >
            {selectedTable ? 'Update Table' : 'Add Table'}
          </Button>

          {selectedTable && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              variant="danger"
              className={styles.deleteButton}
            >
              Delete Table
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default TableForm;
