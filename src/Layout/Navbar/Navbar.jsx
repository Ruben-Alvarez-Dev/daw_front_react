import React from 'react';
import styles from './Navbar.module.css';
import ContextInfo from '../../components/specific/navbar/ContextInfo';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Restaurant Manager
      </div>
      <div className={styles.contextInfo}>
        <ContextInfo />
      </div>
      <div className={styles.actions}>
        {/* Aquí puedes añadir botones de acción si los necesitas */}
      </div>
    </nav>
  );
};

export default Navbar;
