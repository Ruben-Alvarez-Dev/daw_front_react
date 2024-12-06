import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import styles from './ContextInfo.module.css';

const ContextInfo = () => {
  const {
    selectedRestaurant,
    selectedUser,
    selectedZone,
    selectedTable,
  } = useAppContext();

  return (
    <div className={styles.contextInfo}>
      {selectedRestaurant && (
        <div className={styles.infoItem}>
          <span className={styles.label}>Restaurant:</span>
          <span className={styles.value}>{selectedRestaurant.name}</span>
        </div>
      )}
      {selectedUser && (
        <div className={styles.infoItem}>
          <span className={styles.label}>User:</span>
          <span className={styles.value}>{selectedUser.name}</span>
        </div>
      )}
      {selectedZone && (
        <div className={styles.infoItem}>
          <span className={styles.label}>Zone:</span>
          <span className={styles.value}>{selectedZone.name}</span>
        </div>
      )}
      {selectedTable && (
        <div className={styles.infoItem}>
          <span className={styles.label}>Table:</span>
          <span className={styles.value}>{selectedTable.number}</span>
        </div>
      )}
    </div>
  );
};

export default ContextInfo;
