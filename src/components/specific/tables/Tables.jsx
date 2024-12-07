import React, { useState, useEffect } from 'react';
import './Tables.css';
import { useAppContext } from '../../../context/AppContext';
import { Card, Title } from '../../common';
import TableList from './TableList';
import TableForm from './TableForm';

const Tables = () => {
  const { selectedRestaurant, activeZone, setActiveZone } = useAppContext();
  const [selectedTable, setSelectedTable] = useState(null);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchZones();
    } else {
      setZones([]);
      setActiveZone('');
      setSelectedTable(null);
    }
  }, [selectedRestaurant]);

  const fetchZones = async () => {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/${selectedRestaurant.id}`);
      if (!response.ok) throw new Error('Failed to fetch zones');
      const data = await response.json();
      setZones(data.zones || []);
    } catch (error) {
      console.error('Error fetching zones:', error);
      setZones([]);
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  return (
    <div className="tables-container">
      <div className="tables-main-content">
        <div className="tables-left-section">
        </div>

        <Card 
          card-header={<Title>Zone Selection</Title>}
          card-body={
            selectedRestaurant ? (
              <div className="zone-selector">
                <select 
                  value={activeZone} 
                  onChange={(e) => setActiveZone(e.target.value)}
                  className="zone-select"
                >
                  <option value="">Select a zone</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
                <TableList
                  restaurantId={selectedRestaurant.id}
                  zones={zones}
                  selectedZone={activeZone}
                  onSelectTable={handleTableSelect}
                  selectedTable={selectedTable}
                />
              </div>
            ) : (
              <div className="no-restaurant-message">
                Please select a restaurant first
              </div>
            )
          }
          card-footer={
            <div className="zone-info">
              {activeZone ? (
                <p>Active Zone: {activeZone}</p>
              ) : (
                <p>No zone selected</p>
              )}
            </div>
          }
        />

        <div className="tables-right-section">
          {selectedTable && (
            <TableForm
              restaurantId={selectedRestaurant?.id}
              table={selectedTable}
              zones={zones}
              onClose={() => setSelectedTable(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tables;
