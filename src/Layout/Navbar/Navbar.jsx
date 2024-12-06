import React, { useEffect } from 'react';
import styles from './Navbar.module.css';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
  const { selectedRestaurant, activeZone, selectedTable, selectedUser } = useAppContext();

  useEffect(() => {
    console.log('Navbar - Selected User changed:', selectedUser);
  }, [selectedUser]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Restaurant Manager
      </div>
      <div className={styles.info}>
        {selectedRestaurant && (
          <span className={styles.infoItem}>
            <span className={styles.label}>Restaurant:</span>
            <span className={styles.value}>{selectedRestaurant.name}</span>
          </span>
        )}
        {activeZone && (
          <span className={styles.infoItem}>
            <span className={styles.label}>Zone:</span>
            <span className={styles.value}>{activeZone}</span>
          </span>
        )}
        {selectedTable && (
          <span className={styles.infoItem}>
            <span className={styles.label}>Table:</span>
            <span className={styles.value}>{selectedTable.number}</span>
          </span>
        )}
        {selectedUser && (
          <span className={styles.infoItem}>
            <span className={styles.label}>User:</span>
            <span className={styles.value}>{selectedUser.name}</span>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
