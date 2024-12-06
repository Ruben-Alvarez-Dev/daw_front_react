import React, { useState } from 'react';
import styles from './Users.module.css';
import UserList from './UserList';
import UserForm from './UserForm';

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleUserSaved = () => {
    setSelectedUser(null);
  };

  const handleUserDeleted = () => {
    setSelectedUser(null);
  };

  return (
    <div className={styles.usersContainer}>
      <div className={styles.listSection}>
        <UserList onSelectUser={handleUserSelect} />
      </div>
      <div className={styles.formSection}>
        <UserForm
          selectedUser={selectedUser}
          onUserSaved={handleUserSaved}
          onUserDeleted={handleUserDeleted}
        />
      </div>
    </div>
  );
};

export default Users;
