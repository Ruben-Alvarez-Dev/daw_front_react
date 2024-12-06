import React from 'react';
import './Settings.css';
import { Title } from '../../common';

const Settings = () => {
  return (
    <div className="settings-container">
      <Title icon="⚙️" text="Settings" />
      <div className="settings-content">
        <div className="settings-section">
          <h2 className="section-title">General Settings</h2>
          <div className="setting-group">
            <label className="setting-label">Theme</label>
            <select className="setting-input">
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div className="setting-group">
            <label className="setting-label">Language</label>
            <select className="setting-input">
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
        
        <div className="settings-section">
          <h2 className="section-title">Restaurant Settings</h2>
          <div className="setting-group">
            <label className="setting-label">Default View</label>
            <select className="setting-input">
              <option value="list">List View</option>
              <option value="grid">Grid View</option>
            </select>
          </div>
          <div className="setting-group">
            <label className="setting-label">Auto-refresh Interval</label>
            <select className="setting-input">
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
