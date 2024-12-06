import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../views/Dashboard/Dashboard';
import Users from '../../views/Users/Users';
import Restaurants from '../../views/Restaurants/Restaurants';
import Tables from '../../views/Tables/Tables';
import Reservations from '../../views/Reservations/Reservations';
import Settings from '../../views/Settings/Settings';
import styles from './Display.module.css';

const Display = () => {
  return (
    <main className={styles.display}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </main>
  );
};

export default Display;
