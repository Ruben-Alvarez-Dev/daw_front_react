import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import './ContextInfo.css';

const ContextInfo = () => {
  const {
    selectedRestaurant,
    selectedUser,
    selectedZone,
    selectedTable,
  } = useAppContext();

  return (
    <div className="context-info">
      {selectedRestaurant && (
        <div className="info-item">
          <span className="info-label">Restaurant:</span>
          <span className="info-value">{selectedRestaurant.name}</span>
        </div>
      )}
      {selectedUser && (
        <div className="info-item">
          <span className="info-label">User:</span>
          <span className="info-value">{selectedUser.name}</span>
        </div>
      )}
      {selectedZone && (
        <div className="info-item">
          <span className="info-label">Zone:</span>
          <span className="info-value">{selectedZone.name}</span>
        </div>
      )}
      {selectedTable && (
        <div className="info-item">
          <span className="info-label">Table:</span>
          <span className="info-value">{selectedTable.number}</span>
        </div>
      )}
    </div>
  );
};

export default ContextInfo;
