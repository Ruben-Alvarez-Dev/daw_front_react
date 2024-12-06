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
        <ul className={styles.userGrid}>
          {users.map((user) => (
            <li 
              key={user.id} 
              onClick={() => handleUserClick(user)}
              className={`${styles.userItem} ${selectedUser?.id === user.id ? styles.selected : ''}`}
            >
              <div className={styles.userMainInfo}>
                <div className={styles.userNameSection}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userVisits}>
                    <span className={styles.visitsLabel}>Visits:</span>
                    <span className={styles.visitsCount}>{user.visits || 0}</span>
                  </span>
                </div>
                <div className={styles.userMainRight}>
                  <span className={styles.userRole}>{user.role}</span>
                  <span className={`${styles.userStatus} ${styles[`status${user.status}`]}`}>
                    {user.status}
                  </span>
                  <span className={styles.userId}>ID: {user.id}</span>
                </div>
              </div>
              <div className={styles.userSecondaryInfo}>
                <div className={styles.userContactInfo}>
                  <span className={styles.userEmail}>{user.email}</span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.userPhone}>{user.phone || 'No phone'}</span>
                </div>
                <div className={styles.userMetaInfo}>
                  <span className={styles.userCreatedAt}>Created: {new Date(user.createdAt).toLocaleDateString()}</span>
                  <span className={styles.userLastLogin}>Last Login: {new Date(user.lastLogin).toLocaleString()}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.footer}>
        <p>Total Users: {users.length}</p>
      </div>
    </Card>
  );
};

export default UserList;
