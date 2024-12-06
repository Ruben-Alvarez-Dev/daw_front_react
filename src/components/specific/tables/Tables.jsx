import React from 'react';
import styles from './Tables.module.css';
import { Card, Title, List } from '../../common';

const Tables = () => {
  return (
    <div className={styles.tablesContainer}>
      <Card>
        <Title>Tables Management</Title>
        {/* Aquí irá el contenido específico de mesas */}
      </Card>
    </div>
  );
};

export default Tables;
