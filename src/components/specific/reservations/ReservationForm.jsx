import React, { useState, useEffect } from 'react';
import styles from './ReservationForm.module.css';
import { Button } from '../../common';

const ReservationForm = ({
  selectedRestaurant,
  selectedUser,
  selectedReservation,
  onReservationSaved,
  onReservationDeleted,
}) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedReservation) {
      setFormData({
        date: selectedReservation.date,
        time: selectedReservation.time,
        guests: selectedReservation.guests,
        notes: selectedReservation.notes || '',
      });
    } else {
      setFormData({
        date: '',
        time: '',
        guests: '',
        notes: '',
      });
    }
  }, [selectedReservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRestaurant || !selectedUser) {
      setError('Please select a restaurant and user first');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const reservationData = {
        ...formData,
        restaurantId: selectedRestaurant.id,
        userId: selectedUser.id,
        status: 'pending',
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

      setFormData({
        date: '',
        time: '',
        guests: '',
        notes: '',
      });
      setError(null);
      onReservationSaved();
    } catch (err) {
      console.error('Error saving reservation:', err);
      setError('Could not save reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedReservation) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `http://localhost:3000/reservations/${selectedReservation.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }

      setFormData({
        date: '',
        time: '',
        guests: '',
        notes: '',
      });
      setError(null);
      onReservationDeleted();
    } catch (err) {
      console.error('Error deleting reservation:', err);
      setError('Could not delete reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null); // Clear error when user starts typing
  };

  const isFormValid = () => {
    return (
      formData.date &&
      formData.time &&
      formData.guests &&
      selectedRestaurant &&
      selectedUser
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="guests">Number of Guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.buttonGroup}>
        <Button
          type="submit"
          disabled={loading || !isFormValid()}
        >
          {loading
            ? 'Saving...'
            : selectedReservation
            ? 'Update Reservation'
            : 'Create Reservation'}
        </Button>
        {selectedReservation && (
          <Button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            variant="danger"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </div>
    </form>
  );
};

export default ReservationForm;
