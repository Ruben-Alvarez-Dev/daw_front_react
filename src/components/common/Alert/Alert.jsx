import React from 'react';
import './Alert.css';

const Alert = ({ type = 'info', children, className = '' }) => {
  return (
    <div className={`alert ${type} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;
