import React from 'react';
import styles from './UserList.module.css';
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
        <div className={styles.noUsers}>No users found</div>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Users List</Title>
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
                onClick={() => handleUserClick(user)}
                className={`${styles.tableRow} ${selectedUser?.id === user.id ? styles.selected : ''}`}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={styles.role}>{user.role}</td>
                <td>{user.status}</td>
                <td>{new Date(user.lastLogin).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.footer}>
        <p>Total Users: {users.length}</p>
      </div>
    </Card>
  );
};

export default UserList;
