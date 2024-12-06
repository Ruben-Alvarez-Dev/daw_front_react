import React, { useState, useEffect } from 'react';
import './UserForm.css';
import { Card, Title, Input, Button } from '../../common';

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
    <Card>
      <div className="user-form-container">
        <div className="header">
          <Title>{selectedUser ? 'Edit User' : 'Create User'}</Title>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error">{error}</div>}
          
          <div className="form-group">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-actions">
            <Button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : (selectedUser ? 'Update User' : 'Create User')}
            </Button>

            {selectedUser && (
              <Button
                type="button"
                className="delete-button"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete User'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default UserForm;
