import React, { useState, useEffect } from 'react';
import './UserForm.css';
import { Card, Title, Input, Button } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const UserForm = ({ onSave, onDelete }) => {
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
        throw new Error('Failed to save user');
      }

      if (onSave) {
        onSave();
      }
      
      if (!selectedUser) {
        setFormData(initialFormState);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/users/${selectedUser.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      if (onDelete) {
        onDelete();
      }
      
      setFormData(initialFormState);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const header = (
    <Title>{selectedUser ? 'Edit User' : 'Create New User'}</Title>
  );

  const body = (
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
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      {error && <div className="error-message">{error}</div>}
    </form>
  );

  const footer = (
    <div className="form-actions">
      <Button type="submit" onClick={handleSubmit} disabled={loading}>
        {selectedUser ? 'Update' : 'Create'}
      </Button>
      {selectedUser && (
        <Button type="button" onClick={handleDelete} disabled={loading} className="delete">
          Delete
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

export default UserForm;
