import React, { createContext, useContext, useState, useCallback } from 'react';
import { userService } from '../services/users';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      setLoading(true);
      const newUser = await userService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    users,
    selectedUser,
    loading,
    error,
    setSelectedUser,
    loadUsers,
    createUser,
    updateUser,
    deleteUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
