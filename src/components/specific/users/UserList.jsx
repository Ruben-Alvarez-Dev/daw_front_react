import React from 'react';
import './UserList.css';
import { Card, Title } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const UserList = ({ users, onSelectUser }) => {
  const { selectedUser, setSelectedUser } = useAppContext();

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (onSelectUser) {
      onSelectUser(user);
    }
  };

  if (!users?.length) {
    return (
      <Card
        card-header={<Title>Users List</Title>}
        card-body={<div className="no-users">No users found</div>}
        card-footer={<div>Total users: 0</div>}
      />
    );
  }

  const header = <Title>Users List</Title>;

  const body = (
    <div className="user-list">
      <table className="table">
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
              onClick={() => handleUserClick(user)}
              className={`table-row ${selectedUser?.id === user.id ? 'selected' : ''}`}
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="role">{user.role}</td>
              <td>{user.status}</td>
              <td>{new Date(user.lastLogin).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const footer = (
    <div className="user-list-footer">
      <p>Total users: {users.length}</p>
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

export default UserList;
