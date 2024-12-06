import React, { useState } from 'react';
import styles from './Tables.module.css';
import RestaurantSelector from './RestaurantSelector';
import TableList from './TableList';
import TableForm from './TableForm';
import { Card } from '../../common';

const Tables = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedTable, setSelectedTable] = useState(null);

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedZone('all');
    setSelectedTable(null);
  };

  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
    setSelectedTable(null);
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleTableSaved = () => {
    setSelectedTable(null);
  };

  const handleTableDeleted = () => {
    setSelectedTable(null);
  };

  return (
    <div className={styles.tablesContainer}>
      <div className={styles.restaurantSection}>
        <RestaurantSelector
          onSelectRestaurant={handleRestaurantSelect}
          selectedRestaurant={selectedRestaurant}
        />
      </div>
      <div className={styles.tablesSection}>
        <Card>
          {selectedRestaurant ? (
            <TableList
              restaurantId={selectedRestaurant.id}
              zones={selectedRestaurant.zones}
              selectedZone={selectedZone}
              onZoneChange={handleZoneChange}
              onSelectTable={handleTableSelect}
            />
          ) : (
            <div className={styles.noSelection}>
              Select a restaurant to view its tables
            </div>
          )}
        </Card>
      </div>
      <div className={styles.formSection}>
        <TableForm
          selectedRestaurant={selectedRestaurant}
          selectedTable={selectedTable}
          onTableSaved={handleTableSaved}
          onTableDeleted={handleTableDeleted}
        />
      </div>
    </div>
  );
};

export default Tables;
