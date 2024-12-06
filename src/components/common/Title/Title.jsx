import React from 'react';
import './Title.css';

const Title = ({ children, className = '' }) => {
  return (
    <h1 className={`title ${className}`}>
      {children}
    </h1>
  );
};

export default Title;
