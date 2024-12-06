import React from 'react';
import styles from './Select.module.css';

const Select = ({ label, children, ...props }) => {
  return (
    <div className={styles.selectContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={styles.select} {...props}>
        {children}
      </select>
    </div>
  );
};

export default Select;
