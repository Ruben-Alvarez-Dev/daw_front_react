import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeZone, setActiveZone] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const value = {
    selectedRestaurant,
    setSelectedRestaurant,
    selectedTable,
    setSelectedTable,
    activeZone,
    setActiveZone,
    selectedUser,
    setSelectedUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
