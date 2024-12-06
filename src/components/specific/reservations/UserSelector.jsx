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

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  if (loading) {
    return <div className="message">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="message">No users found</div>;
  }

  return (
    <Card>
      <Title>Select User</Title>
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
            onClick={() => handleUserSelect(user)}
          >
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserSelector;
