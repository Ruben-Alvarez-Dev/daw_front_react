import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Navbar from './Navbar/Navbar';
import Aside from './Aside/Aside';
import { AppProvider } from '../context/AppContext';

const Layout = () => {
  return (
    <AppProvider>
      <div className={styles.layout}>
        <Navbar />
        <div className={styles.content}>
          <Aside />
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </div>
    </AppProvider>
  );
};

export default Layout;
