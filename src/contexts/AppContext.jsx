import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Selected entities state
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Notifications state
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      timestamp: new Date(),
      ...notification,
    };
    
    setNotifications(prev => [newNotification, ...prev]);

    // Auto remove notification after duration (default 5000ms)
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Success notification helper
  const notifySuccess = useCallback((message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options
    });
  }, [addNotification]);

  // Error notification helper
  const notifyError = useCallback((message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      duration: 7000, // Error messages stay longer by default
      ...options
    });
  }, [addNotification]);

  // Warning notification helper
  const notifyWarning = useCallback((message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      ...options
    });
  }, [addNotification]);

  // Info notification helper
  const notifyInfo = useCallback((message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options
    });
  }, [addNotification]);

  const value = {
    // Sidebar
    isSidebarOpen,
    toggleSidebar,
    
    // Selected entities
    selectedUser,
    setSelectedUser,
    selectedRestaurant,
    setSelectedRestaurant,
    selectedTable,
    setSelectedTable,
    selectedReservation,
    setSelectedReservation,
    
    // Notifications
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo
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
