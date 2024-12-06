import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  onClick,
  className = ''
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
