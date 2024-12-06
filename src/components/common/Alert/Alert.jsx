import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ type = 'info', children, className = '' }) => {
  return (
    <div className={`${styles.alert} ${styles[type]} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;
