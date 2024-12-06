import React, { useState, useEffect } from 'react';
import './Tables.css';
import { useAppContext } from '../../../context/AppContext';
import { Card } from '../../common';
import TableList from './TableList';
import TableForm from './TableForm';
import RestaurantSelector from '../restaurants/RestaurantSelector';

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
        <Card className="tables-left-section">
          <RestaurantSelector />
        </Card>

        <Card className="tables-center-section">
          {selectedRestaurant ? (
            <div>
              <select 
                value={activeZone} 
                onChange={(e) => setActiveZone(e.target.value)}
                className="zone-selector"
              >
                <option value="">All Zones</option>
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
            <p>Please select a restaurant first</p>
          )}
        </Card>

        <Card className="tables-right-section">
          <TableForm
            restaurantId={selectedRestaurant?.id}
            table={selectedTable}
            zones={zones}
            onClose={() => setSelectedTable(null)}
          />
        </Card>
      </div>
    </div>
  );
};

export default Tables;
