import React, { useState, useEffect } from 'react';
import './TableList.css';
import { Title, Card } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const TableList = ({ onSelectTable }) => {
  const { selectedRestaurant, activeZone, setActiveZone, selectedTable, setSelectedTable } = useAppContext();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchTables();
      setActiveZone('');
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
    return (
      <Card
        card-header={<Title>Tables</Title>}
        card-body={<div className="table-message">Please select a restaurant</div>}
        card-footer={<div>No restaurant selected</div>}
      />
    );
  }

  if (loading) {
    return (
      <Card
        card-header={<Title>Tables</Title>}
        card-body={<div className="table-message">Loading tables...</div>}
        card-footer={<div>Loading...</div>}
      />
    );
  }

  if (error) {
    return (
      <Card
        card-header={<Title>Tables</Title>}
        card-body={<div className="error-message">{error}</div>}
        card-footer={<div>Error loading tables</div>}
      />
    );
  }

  const availableZones = selectedRestaurant.zones || ['main'];
  const filteredTables = !activeZone ? tables : tables.filter(table => table.zone === activeZone);

  const header = (
    <div className="table-list-header">
      <Title>Tables</Title>
      <select value={activeZone} onChange={(e) => setActiveZone(e.target.value)} className="zone-selector">
        <option value="">All Zones</option>
        {availableZones.map(zone => (
          <option key={zone} value={zone}>{zone}</option>
        ))}
      </select>
    </div>
  );

  const body = (
    <div className="table-grid">
      {filteredTables.map(table => (
        <div
          key={table.id}
          className={`table-item ${selectedTable?.id === table.id ? 'selected' : ''}`}
          onClick={() => {
            setSelectedTable(table);
            if (onSelectTable) onSelectTable(table);
          }}
        >
          <div className="table-number">Table {table.number}</div>
          <div className="table-capacity">Capacity: {table.capacity}</div>
          <div className="table-zone">Zone: {table.zone}</div>
          <div className="table-status">Status: {table.status}</div>
        </div>
      ))}
    </div>
  );

  const footer = (
    <div className="table-list-footer">
      <p>Total Tables: {filteredTables.length}</p>
      {activeZone && <p>Zone: {activeZone}</p>}
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

export default TableList;
