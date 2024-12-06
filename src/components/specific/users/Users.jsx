import React, { useState } from 'react';
import styles from './Users.module.css';
import UserList from './UserList';
import UserForm from './UserForm';
import { useAppContext } from '../../../context/AppContext';

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { setSelectedUser: setGlobalUser } = useAppContext();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setGlobalUser(user);
  };

  const handleUserSaved = () => {
    setSelectedUser(null);
    setGlobalUser(null);
  };

  const handleUserDeleted = () => {
    setSelectedUser(null);
    setGlobalUser(null);
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
