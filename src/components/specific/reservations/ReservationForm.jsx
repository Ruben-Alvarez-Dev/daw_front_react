import React, { useState, useEffect } from 'react';
import styles from './ReservationForm.module.css';
import { Card, Title } from '../../common';

const RESERVATION_STATUS = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled'
};

const ReservationForm = ({ selectedReservation, onReservationSaved, onReservationDeleted }) => {
  const initialFormState = {
    date: '',
    time: '',
    numberOfGuests: '',
    notes: '',
    status: RESERVATION_STATUS.PENDING
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedReservation) {
      try {
        const date = new Date(selectedReservation.date);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date format');
        }

        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        const formattedDate = localDate.toISOString().split('T')[0];
        const formattedTime = localDate.toTimeString().slice(0, 5);

        setFormData({
          date: formattedDate,
          time: formattedTime,
          numberOfGuests: selectedReservation.numberOfGuests?.toString() || '',
          notes: selectedReservation.notes || '',
          status: selectedReservation.status || RESERVATION_STATUS.PENDING
        });
        setError(null);
      } catch (err) {
        console.error('Error updating form with reservation:', err);
        setError('Error loading reservation details: ' + err.message);
      }
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
    setError(null);
  };

  const validateForm = () => {
    if (!formData.date) return 'Date is required';
    if (!formData.time) return 'Time is required';
    
    const guests = parseInt(formData.numberOfGuests);
    if (isNaN(guests) || guests < 1) return 'Number of guests must be at least 1';
    
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    if (isNaN(dateTime.getTime())) return 'Invalid date or time';
    
    if (!formData.status) return 'Status is required';
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const localDate = new Date(`${formData.date}T${formData.time}`);
      const utcDate = new Date(localDate.getTime() + (localDate.getTimezoneOffset() * 60000));

      const reservationData = {
        date: utcDate.toISOString(),
        numberOfGuests: parseInt(formData.numberOfGuests),
        notes: formData.notes,
        status: formData.status
      };

      const url = 'http://localhost:3000/reservations';
      const method = selectedReservation ? 'PUT' : 'POST';
      const finalUrl = selectedReservation ? `${url}/${selectedReservation.id}` : url;

      const response = await fetch(finalUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save reservation');
      }

      const savedReservation = await response.json();
      console.log('Reservation saved successfully:', savedReservation);
      onReservationSaved();
    } catch (err) {
      console.error('Error saving reservation:', err);
      setError(err.message || 'Failed to save reservation');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedReservation) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000/reservations/${selectedReservation.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }

      console.log('Reservation deleted successfully');
      onReservationDeleted();
    } catch (err) {
      console.error('Error deleting reservation:', err);
      setError('Failed to delete reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Title>{selectedReservation ? 'Edit Reservation' : 'New Reservation'}</Title>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numberOfGuests">Number of Guests:</label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            {Object.values(RESERVATION_STATUS).map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Add any special requests or notes here..."
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Saving...' : selectedReservation ? 'Update' : 'Create'}
          </button>

          {selectedReservation && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;
