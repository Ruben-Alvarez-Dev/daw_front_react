import React from 'react';
import styles from './Reservations.module.css';
import { Card, Title, List } from '../../common';

const Reservations = () => {
  return (
    <div className={styles.reservationsContainer}>
      <Card>
        <Title>Reservations Management</Title>
        {/* Aquí irá el contenido específico de reservas */}
      </Card>
    </div>
  );
};

export default Reservations;
