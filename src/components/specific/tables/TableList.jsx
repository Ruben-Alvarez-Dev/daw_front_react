import React, { useState, useEffect } from 'react';
import styles from './TableList.module.css';
import { Card, Title } from '../../common';

const TableList = ({ restaurantId, zones = [], selectedZone, onZoneChange, onSelectTable }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (restaurantId) {
      fetchTables();
    }
  }, [restaurantId, selectedZone]);

  const fetchTables = async () => {
    try {
      setLoading(true);
      let url = `/api/tables?restaurantId=${restaurantId}`;
      if (selectedZone !== 'all') {
        url += `&zone=${selectedZone}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTables(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tables:', err);
      setError('Failed to load tables');
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = (status) => {
    const statusClass = status === 'available' ? styles.statusAvailable : styles.statusOccupied;
    return <span className={`${styles.status} ${statusClass}`}>{status}</span>;
  };

  if (loading) {
    return <div>Loading tables...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <Card>
      <Title>Tables</Title>
      <div className={styles.zoneSelector}>
        <select 
          value={selectedZone} 
          onChange={(e) => onZoneChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Zones</option>
          {zones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Zone</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr
                key={table.id}
                onClick={() => onSelectTable(table)}
                className={styles.tableRow}
              >
                <td>{table.number}</td>
                <td>{table.zone}</td>
                <td>{table.capacity}</td>
                <td>{renderStatus(table.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.totalCount}>
        Total Tables: {tables.length}
      </div>
    </Card>
  );
};

export default TableList;
