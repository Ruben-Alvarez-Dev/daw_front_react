import React, { useState, useEffect } from 'react';
import styles from './UserSelector.module.css';
import { Card, Title } from '../../common';

const UserSelector = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching users...');
        const response = await fetch('http://localhost:3000/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        console.log('Received users:', data);
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
    return <div className={styles.message}>Loading users...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (users.length === 0) {
    return <div className={styles.message}>No users found</div>;
  }

  return (
    <Card>
      <Title>Select User</Title>
      <div className={styles.userList}>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`${styles.userItem} ${
              selectedUser?.id === user.id ? styles.selected : ''
            }`}
          >
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userInfo}>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserSelector;