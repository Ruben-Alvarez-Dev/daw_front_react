import React from 'react';
import './Select.css';

const Select = ({ label, children, ...props }) => {
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select className="select" {...props}>
        {children}
      </select>
    </div>
  );
};

export default Select;
