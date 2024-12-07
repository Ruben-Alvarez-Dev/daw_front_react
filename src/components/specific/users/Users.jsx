import React from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import './Users.css';

const Users = () => {
  return (
    <div className="users-container">
      <div className="users-list">
        <UserList />
      </div>
      <div className="users-form">
        <UserForm />
      </div>
    </div>
  );
};

export default Users;
