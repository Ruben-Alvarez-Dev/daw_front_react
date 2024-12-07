import React, { useState, useEffect } from 'react';
import './ReservationForm.css';
import { Card, Title, Button, Input, Select } from '../../common';
import { useAppContext } from '../../../contexts/AppContext';

const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled'
};

const ReservationForm = ({ onSave, onDelete }) => {
  const { selectedReservation } = useAppContext();
  const initialFormState = {
    date: '',
    time: '',
    guests: '',
    notes: '',
    status: RESERVATION_STATUS.PENDING
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedReservation) {
      const date = new Date(selectedReservation.date);
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = date.toTimeString().slice(0, 5);

      setFormData({
        date: formattedDate,
        time: formattedTime,
        guests: selectedReservation.guests?.toString() || '',
        notes: selectedReservation.notes || '',
        status: selectedReservation.status || RESERVATION_STATUS.PENDING
      });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedReservation]);

  const handleInputChange = (e) => {
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
      const reservationData = {
        ...formData,
        date: new Date(`${formData.date}T${formData.time}`).toISOString(),
        guests: parseInt(formData.guests)
      };

      const url = selectedReservation
        ? `http://localhost:3000/reservations/${selectedReservation.id}`
        : 'http://localhost:3000/reservations';

      const response = await fetch(url, {
        method: selectedReservation ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Failed to save reservation');
      }

      const savedReservation = await response.json();
      if (onSave) onSave(savedReservation);
      
      if (!selectedReservation) {
        setFormData(initialFormState);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const header = (
    <Title>{selectedReservation ? 'Edit Reservation' : 'New Reservation'}</Title>
  );

  const body = (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-row">
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
      </div>
      <Input
        label="Number of Guests"
        type="number"
        name="guests"
        value={formData.guests}
        onChange={handleInputChange}
        required
        min="1"
      />
      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        required
      >
        <option value={RESERVATION_STATUS.PENDING}>Pending</option>
        <option value={RESERVATION_STATUS.CONFIRMED}>Confirmed</option>
        <option value={RESERVATION_STATUS.CANCELLED}>Cancelled</option>
      </Select>
      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="3"
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </form>
  );

  const footer = (
    <div className="form-actions">
      <Button type="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : (selectedReservation ? 'Update' : 'Create')}
      </Button>
      {selectedReservation && (
        <Button
          type="button"
          onClick={async () => {
            if (!window.confirm('Are you sure you want to delete this reservation?')) {
              return;
            }

            setLoading(true);
            setError(null);

            try {
              const response = await fetch(`http://localhost:3000/reservations/${selectedReservation.id}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                throw new Error('Failed to delete reservation');
              }

              if (onDelete) onDelete();
              setFormData(initialFormState);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          className="delete"
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      )}
    </div>
  );

  return (
    <Card
      card-header={header}
      card-body={body}
      card-footer={footer}
    />
  );
};

export default ReservationForm;
