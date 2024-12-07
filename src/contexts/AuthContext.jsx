import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const login = useCallback(async (credentials) => {
    try {
      // TODO: Implementar llamada real a la API
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const userData = await response.json();
      setUser(userData);
      setIsAuthenticated(true);
      setPermissions(userData.permissions || []);
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setPermissions([]);
    // TODO: Limpiar localStorage o cookies si es necesario
  }, []);

  const value = {
    user,
    isAuthenticated,
    permissions,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
