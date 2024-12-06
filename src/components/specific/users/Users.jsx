import React, { useState, useEffect } from 'react';
import './Users.css';
import UserList from './UserList';
import UserForm from './UserForm';
import { useAppContext } from '../../../context/AppContext';

const Users = () => {
  const { selectedUser, setSelectedUser } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(`Error loading users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSaved = () => {
    setSelectedUser(null);
    fetchUsers(); // Recargar usuarios después de guardar
  };

  const handleUserDeleted = () => {
    setSelectedUser(null);
    fetchUsers(); // Recargar usuarios después de eliminar
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="users-container">
      <div className="list-section">
        <UserList users={users} />
      </div>
      <div className="form-section">
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
