import React, { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFilters, setUserFilters] = useState({
    role: '',
    status: '',
    search: ''
  });

  const fetchUsers = useCallback(async () => {
    try {
      // TODO: Implement API call
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      // TODO: Implement API call
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (userId, userData) => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      const updatedUser = await response.json();
      setUsers(prev => prev.map(user => 
        user.id === userId ? updatedUser : user
      ));
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }, []);

  const deleteUser = useCallback(async (userId) => {
    try {
      // TODO: Implement API call
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      setUsers(prev => prev.filter(user => user.id !== userId));
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }, [selectedUser?.id]);

  const filterUsers = useCallback((filters) => {
    setUserFilters(prev => ({ ...prev, ...filters }));
  }, []);

  const value = {
    users,
    selectedUser,
    userFilters,
    setSelectedUser,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    filterUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
