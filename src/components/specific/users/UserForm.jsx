import React, { useState, useEffect } from 'react';
import styles from './UserForm.module.css';
import { Card, Title } from '../../common';

const UserForm = ({ selectedUser, onUserSaved, onUserDeleted }) => {
  const initialFormState = {
    name: '',
    email: '',
    role: 'staff',
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData(initialFormState);
    }
  }, [selectedUser]);

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
      const url = 'http://localhost:3000/users';
      const method = selectedUser ? 'PUT' : 'POST';
      const finalUrl = selectedUser ? `${url}/${selectedUser.id}` : url;

      const response = await fetch(finalUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedUser = await response.json();
      onUserSaved(savedUser);
      if (!selectedUser) {
        setFormData(initialFormState);
      }
    } catch (err) {
      setError(`Error saving user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser || !window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onUserDeleted(selectedUser.id);
      setFormData(initialFormState);
    } catch (err) {
      setError(`Error deleting user: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.userFormContainer}>
      <Card
        card-header={
          <div className={styles.header}>
            <Title>{selectedUser ? 'Edit User' : 'Create User'}</Title>
          </div>
        }
        card-body={
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formActions}>
              <button 
                type="submit" 
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? 'Saving...' : (selectedUser ? 'Update User' : 'Create User')}
              </button>

              {selectedUser && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className={styles.deleteButton}
                >
                  {loading ? 'Deleting...' : 'Delete User'}
                </button>
              )}
            </div>
          </form>
        }
      />
    </div>
  );
};

export default UserForm;
