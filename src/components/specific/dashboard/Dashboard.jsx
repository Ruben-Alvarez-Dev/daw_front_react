import React from 'react';
import './Dashboard.css';
import { useAppContext } from '../../../context/AppContext';
import Card from '../../common/Card/Card';

const Dashboard = () => {
  const { selectedRestaurant, activeZone } = useAppContext();

  const header = (
    <h2>Dashboard</h2>
  );

  const body = (
    <div>
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

  const footer = (
    <div>
      {/* Aquí pueden ir estadísticas o información adicional */}
      <p>Última actualización: {new Date().toLocaleDateString()}</p>
    </div>
  );

  return (
    <Card
      card-header={header}
      card-body={body}
      card-footer={footer}
    />
  );
};

export default Dashboard;
