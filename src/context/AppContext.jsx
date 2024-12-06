import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const value = {
    selectedRestaurant,
    setSelectedRestaurant,
    selectedUser,
    setSelectedUser,
    selectedZone,
    setSelectedZone,
    selectedTable,
    setSelectedTable,
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
