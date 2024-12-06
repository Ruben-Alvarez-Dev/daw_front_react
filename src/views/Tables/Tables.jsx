import React from 'react';
import TablesComponent from '../../components/specific/tables/Tables';
import styles from './Tables.module.css';

const Tables = () => {
  return (
    <div className={styles.tablesView}>
      <h1>Tables</h1>
      <TablesComponent />
    </div>
  );
};

export default Tables;
