import React from 'react';
import styles from './Settings.module.css';
import { Title } from '../../common';

const Settings = () => {
  return (
    <div className={styles.settings}>
      <Title icon="⚙️" text="Settings" />
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>General Settings</h2>
          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Theme</label>
            <select className={styles.settingInput}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Language</label>
            <select className={styles.settingInput}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Restaurant Settings</h2>
          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Default View</label>
            <select className={styles.settingInput}>
              <option value="list">List View</option>
              <option value="grid">Grid View</option>
            </select>
          </div>
          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Auto-refresh Interval</label>
            <select className={styles.settingInput}>
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
