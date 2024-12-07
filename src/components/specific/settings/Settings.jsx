import React, { useState } from 'react';
import './Settings.css';
import { Title, Card } from '../../common';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    defaultView: 'list',
    refreshInterval: '60'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const generalSettingsCard = (
    <Card
      card-header={<Title>General Settings</Title>}
      card-body={
        <div className="setting-groups">
          <div className="setting-group">
            <label className="setting-label">Theme</label>
            <select 
              className="setting-input"
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div className="setting-group">
            <label className="setting-label">Language</label>
            <select 
              className="setting-input"
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
        </div>
      }
      card-footer={
        <div className="settings-summary">
          Current Theme: {settings.theme === 'dark' ? '🌙 Dark' : '☀️ Light'} | 
          Language: {settings.language === 'en' ? '🇬🇧 English' : '🇪🇸 Spanish'}
        </div>
      }
    />
  );

  const restaurantSettingsCard = (
    <Card
      card-header={<Title>Restaurant Settings</Title>}
      card-body={
        <div className="setting-groups">
          <div className="setting-group">
            <label className="setting-label">Default View</label>
            <select 
              className="setting-input"
              value={settings.defaultView}
              onChange={(e) => handleSettingChange('defaultView', e.target.value)}
            >
              <option value="list">List View</option>
              <option value="grid">Grid View</option>
            </select>
          </div>
          <div className="setting-group">
            <label className="setting-label">Auto-refresh Interval</label>
            <select 
              className="setting-input"
              value={settings.refreshInterval}
              onChange={(e) => handleSettingChange('refreshInterval', e.target.value)}
            >
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
            </select>
          </div>
        </div>
      }
      card-footer={
        <div className="settings-summary">
          View Mode: {settings.defaultView === 'list' ? '📝 List' : '📊 Grid'} | 
          Refresh: ⏱️ {settings.refreshInterval === '30' ? '30s' : 
                      settings.refreshInterval === '60' ? '1m' : '5m'}
        </div>
      }
    />
  );

  return (
    <div className="settings-container">
      <div className="settings-header">
        <Title icon="⚙️" text="Settings" />
      </div>
      <div className="settings-content">
        {generalSettingsCard}
        {restaurantSettingsCard}
      </div>
    </div>
  );
};

export default Settings;
