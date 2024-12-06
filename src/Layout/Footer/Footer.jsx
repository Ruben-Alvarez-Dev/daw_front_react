import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.copyright}> 2024 Restaurant Manager</p>
          <p className={styles.version}>Version 1.0.0</p>
        </div>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Privacy Policy</a>
          <a href="#" className={styles.link}>Terms of Service</a>
          <a href="#" className={styles.link}>Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
