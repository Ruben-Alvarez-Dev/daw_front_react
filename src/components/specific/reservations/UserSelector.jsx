import React, { useState, useEffect } from 'react';
import './UserSelector.css';
import { Card, Title } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const UserSelector = () => {
  const { selectedUser, setSelectedUser } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Could not load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Card
        card-header={<Title>Select User</Title>}
        card-body={<div className="message">Loading users...</div>}
        card-footer={<div>Loading...</div>}
      />
    );
  }

  if (error) {
    return (
      <Card
        card-header={<Title>Select User</Title>}
        card-body={<div className="error">{error}</div>}
        card-footer={<div>Error loading users</div>}
      />
    );
  }

  if (users.length === 0) {
    return (
      <Card
        card-header={<Title>Select User</Title>}
        card-body={<div className="message">No users found</div>}
        card-footer={<div>No users available</div>}
      />
    );
  }

  const header = (
    <Title>Select User</Title>
  );

  const body = (
    <div className="user-list">
      {users.map(user => (
        <div
          key={user.id}
          className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
          onClick={() => setSelectedUser(user)}
        >
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <div className="user-role">{user.role}</div>
        </div>
      ))}
    </div>
  );

  const footer = (
    <div className="selector-footer">
      {selectedUser ? (
        <div>Selected: {selectedUser.name}</div>
      ) : (
        <div>No user selected</div>
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

export default UserSelector;
