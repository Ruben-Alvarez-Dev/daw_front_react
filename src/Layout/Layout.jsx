import React from 'react';
import Navbar from './Navbar/Navbar';
import Aside from './Aside/Aside';
import Display from './Display/Display';
import Footer from './Footer/Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.mainContent}>
        <Aside />
        <Display />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
