import React, { useState, useEffect } from 'react';
import './UserForm.css';
import { Card, Title, Input, Button } from '../../common';
import { useAppContext } from '../../../contexts/AppContext';

const UserForm = ({ onSave, onDelete, onCancel }) => {
  const { selectedUser } = useAppContext();
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
    if (selectedUser?.id) {
      setFormData({
        id: selectedUser.id,
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        role: selectedUser.role || 'staff',
        status: selectedUser.status || 'active'
      });
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
      await onSave(formData);
      setFormData(initialFormState);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser?.id) return;
    
    setLoading(true);
    setError(null);

    try {
      await onDelete(selectedUser.id);
      setFormData(initialFormState);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card
        card-header={<Title>{selectedUser?.id ? 'Edit User' : 'Create New User'}</Title>}
        card-body={<div className="loading">Processing...</div>}
        card-footer={<div>Please wait...</div>}
      />
    );
  }

  return (
    <Card
      card-header={
        <div className="form-header">
          <Title>{selectedUser?.id ? 'Edit User' : 'Create New User'}</Title>
          {selectedUser?.id && (
            <Button type="button" onClick={onCancel} className="close-button">
              ✕
            </Button>
          )}
        </div>
      }
      card-body={
        <form onSubmit={handleSubmit} className="user-form">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <div className="form-group">
            <label>Role</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      }
      card-footer={
        <div className="form-actions">
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={loading}
            className="submit-button"
          >
            {selectedUser?.id ? 'Update' : 'Create'}
          </Button>
          {selectedUser?.id && (
            <Button 
              type="button" 
              onClick={handleDelete} 
              disabled={loading}
              className="delete-button"
            >
              Delete
            </Button>
          )}
        </div>
      }
    />
  );
};

export default UserForm;
