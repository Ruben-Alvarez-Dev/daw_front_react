import React from 'react';
import styles from './Subtitle.module.css';

const Subtitle = ({ children, className = '' }) => {
  return (
    <h2 className={`${styles.subtitle} ${className}`}>
      {children}
    </h2>
  );
};

export default Subtitle;
