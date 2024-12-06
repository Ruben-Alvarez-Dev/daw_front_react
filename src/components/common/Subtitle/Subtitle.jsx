import React from 'react';
import './Subtitle.css';

const Subtitle = ({ children, className = '' }) => {
  return (
    <h2 className={`subtitle ${className}`}>
      {children}
    </h2>
  );
};

export default Subtitle;
