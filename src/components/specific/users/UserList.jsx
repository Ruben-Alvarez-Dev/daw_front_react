import React, { useEffect } from 'react';
import { Card, Title } from '../../common';
import { useAppContext } from '../../../context/AppContext';
import './UserList.css';

const UserList = () => {
  const { users, selectedUser, setSelectedUser, loadUsers, loading, error } = useAppContext();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString();
  };

  const getStatusClassName = (status) => {
    return `status status-${status?.toLowerCase() || 'unknown'}`;
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  if (loading) {
    return (
      <Card
        card-header={<Title>Users List</Title>}
        card-body={<div className="loading">Loading users...</div>}
        card-footer={null}
      />
    );
  }

  if (error) {
    return (
      <Card
        card-header={<Title>Users List</Title>}
        card-body={<div className="error-message">{error}</div>}
        card-footer={null}
      />
    );
  }

  return (
    <Card
      card-header={<Title>Users List</Title>}
      card-body={
        <div className="users-table-container">
          <table className="users-table">
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
              {users.map(user => (
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  className={selectedUser?.id === user.id ? 'selected' : ''}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || 'N/A'}</td>
                  <td>
                    <span className={getStatusClassName(user.status)}>
                      {user.status || 'Unknown'}
                    </span>
                  </td>
                  <td>{formatDate(user.lastLogin)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      card-footer={
        <div className="users-footer">
          <span>Total users: {users.length}</span>
        </div>
      }
    />
  );
};

export default UserList;
