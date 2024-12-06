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
      <Card>
        <div className="no-users">No users found</div>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Users List</Title>
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
      <div className="footer">
        <p>Total Users: {users.length}</p>
      </div>
    </Card>
  );
};

export default UserList;
