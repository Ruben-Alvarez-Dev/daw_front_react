import React, { useState, useEffect } from 'react';
import styles from './TableList.module.css';
import { Title } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const TableList = ({ onSelectTable }) => {
  const { selectedRestaurant, activeZone, setActiveZone, selectedTable, setSelectedTable } = useAppContext();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchTables();
      setActiveZone(''); // Reset to empty (All zones) when restaurant changes
    } else {
      setTables([]);
    }
  }, [selectedRestaurant]);

  const fetchTables = async () => {
    if (!selectedRestaurant) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3000/tables?restaurantId=${selectedRestaurant.id}`);
      if (!response.ok) throw new Error('Failed to fetch tables');
      const data = await response.json();
      setTables(data);
    } catch (error) {
      console.error('Error fetching tables:', error);
      setError('Failed to load tables');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedRestaurant) {
    return <div className={styles.message}>Please select a restaurant</div>;
  }

  const availableZones = selectedRestaurant.zones || ['main'];

  // Filter tables based on active zone
  const filteredTables = !activeZone 
    ? tables 
    : tables.filter(table => table.zone === activeZone);

  const handleZoneChange = (e) => {
    const newZone = e.target.value;
    setActiveZone(newZone === 'all' ? '' : newZone);
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    if (onSelectTable) {
      onSelectTable(table);
    }
  };

  return (
    <div className={styles.container}>
      <Title>Tables</Title>
      
      <div className={styles.zoneSelector}>
        <label htmlFor="zone-select">Zone:</label>
        <select
          id="zone-select"
          value={activeZone || 'all'}
          onChange={handleZoneChange}
          className={styles.select}
        >
          <option value="all">All Zones</option>
          {availableZones.map(zone => (
            <option key={zone} value={zone}>
              {zone.charAt(0).toUpperCase() + zone.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className={styles.message}>Loading tables...</div>}
      {error && <div className={styles.error}>{error}</div>}
      
      {!loading && !error && (
        <div className={styles.tableList}>
          {filteredTables.length === 0 ? (
            <div className={styles.message}>No tables found</div>
          ) : (
            filteredTables.map(table => (
              <div
                key={table.id}
                className={`${styles.tableCard} ${selectedTable?.id === table.id ? styles.selected : ''}`}
                onClick={() => handleTableClick(table)}
              >
                <div className={styles.tableHeader}>
                  <h3>Table {table.number}</h3>
                  <span className={`${styles.status} ${styles[table.status]}`}>
                    {table.status}
                  </span>
                </div>
                <div className={styles.tableInfo}>
                  <p>Zone: {table.zone}</p>
                  <p>Capacity: {table.capacity}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TableList;
