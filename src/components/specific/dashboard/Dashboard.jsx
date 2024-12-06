import React from 'react';
import styles from './Dashboard.module.css';
import { useAppContext } from '../../../context/AppContext';

const Dashboard = () => {
  const { selectedRestaurant, activeZone } = useAppContext();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      
      <div className={styles.summary}>
        <div className={styles.card}>
          <h3>Current Context</h3>
          <div className={styles.info}>
            <p>
              <strong>Restaurant:</strong>{' '}
              {selectedRestaurant ? selectedRestaurant.name : 'None selected'}
            </p>
            <p>
              <strong>Active Zone:</strong>{' '}
              {activeZone ? activeZone : 'All Zones'}
            </p>
          </div>
        </div>

        {/* Aquí puedes agregar más tarjetas con estadísticas o información relevante */}
      </div>
    </div>
  );
};

export default Dashboard;
