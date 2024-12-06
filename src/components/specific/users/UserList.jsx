import React, { useState, useEffect } from 'react';
import styles from './UserList.module.css';
import { Card, Title } from '../../common';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/users', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
      
    } catch (err) {
      console.error('Error details:', err);
      setError(`Error loading users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderUserStatus = (status) => {
    const statusClass = status === 'active' ? styles.statusActive : styles.statusInactive;
    return <span className={`${styles.status} ${statusClass}`}>{status}</span>;
  };

  const handleRowClick = (user) => {
    if (onSelectUser) {
      onSelectUser(user);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.userListContainer}>
      <Card
        card-header={
          <div className={styles.header}>
            <Title>Users List</Title>
          </div>
        }
        card-body={
          <div className={styles.body}>
            <div className={styles.userList}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr 
                      key={user.id} 
                      onClick={() => handleRowClick(user)}
                      className={styles.tableRow}
                    >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className={styles.role}>{user.role}</td>
                      <td>{renderUserStatus(user.status)}</td>
                      <td>{new Date(user.lastLogin).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
        card-footer={
          <div className={styles.footer}>
            <p>Total Users: {users.length}</p>
          </div>
        }
      />
    </div>
  );
};

export default UserList;
