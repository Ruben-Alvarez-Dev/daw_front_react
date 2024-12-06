import React from 'react';
import './Dashboard.css';
import { useAppContext } from '../../../context/AppContext';

const Dashboard = () => {
  const { selectedRestaurant, activeZone } = useAppContext();

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <div className="dashboard-summary">
        <div className="dashboard-card">
          <h3>Current Context</h3>
          <div className="dashboard-info">
            <p>
              <strong>Restaurant:</strong>{' '}
              {selectedRestaurant ? selectedRestaurant.name : 'None selected'}
            </p>
            <p>
              <strong>Active Zone:</strong>{' '}
              {activeZone ? activeZone : 'All Zones'}
            </p>
          </div>
        </div>

        {/* Aquí puedes agregar más tarjetas con estadísticas o información relevante */}
      </div>
    </div>
  );
};

export default Dashboard;
