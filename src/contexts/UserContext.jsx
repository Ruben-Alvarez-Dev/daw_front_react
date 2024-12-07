import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAppContext } from './AppContext';
import { userService } from '../services/userService';

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Estado local
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Estado de usuarios
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener setSelectedUser del AppContext para mantener sincronizado
  const { setSelectedUser: setAppSelectedUser, notifyError, notifySuccess } = useAppContext();

  // Función para mantener sincronizado el usuario seleccionado en ambos contextos
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setAppSelectedUser(user);
  };

  // Users functions
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      notifyError('Error loading users: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [notifyError]);

  const createUser = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userService.create(userData);
      setUsers(prev => [...prev, newUser]);
      notifySuccess('User created successfully');
      return newUser;
    } catch (err) {
      setError(err.message);
      notifyError('Error creating user: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notifySuccess, notifyError]);

  const updateUser = useCallback(async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.update(id, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      notifySuccess('User updated successfully');
      return updatedUser;
    } catch (err) {
      setError(err.message);
      notifyError('Error updating user: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notifySuccess, notifyError]);

  const deleteUser = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await userService.remove(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      notifySuccess('User deleted successfully');
    } catch (err) {
      setError(err.message);
      notifyError('Error deleting user: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [notifySuccess, notifyError]);

  const value = {
    // Estado
    selectedUser,
    users,
    loading,
    error,
    
    // Funciones
    setSelectedUser: handleSelectUser,
    loadUsers,
    createUser,
    updateUser,
    deleteUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
