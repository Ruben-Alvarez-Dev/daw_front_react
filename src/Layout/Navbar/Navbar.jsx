import React, { useEffect } from 'react';
import './Navbar.css';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const { selectedRestaurant, activeZone, selectedTable, selectedUser } = useAppContext();

  useEffect(() => {
    console.log('Navbar - Selected User changed:', selectedUser);
  }, [selectedUser]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Restaurant Manager
      </div>
      <div className="navbar-info">
        {selectedRestaurant && (
          <span className="navbar-info-item">
            <span className="navbar-label">Restaurant:</span>
            <span className="navbar-value">{selectedRestaurant.name}</span>
          </span>
        )}
        {activeZone && (
          <span className="navbar-info-item">
            <span className="navbar-label">Zone:</span>
            <span className="navbar-value">{activeZone}</span>
          </span>
        )}
        {selectedTable && (
          <span className="navbar-info-item">
            <span className="navbar-label">Table:</span>
            <span className="navbar-value">{selectedTable.number}</span>
          </span>
        )}
        {selectedUser && (
          <span className="navbar-info-item">
            <span className="navbar-label">User:</span>
            <span className="navbar-value">{selectedUser.name}</span>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
