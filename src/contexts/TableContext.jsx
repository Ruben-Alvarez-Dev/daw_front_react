import React, { createContext, useContext, useState, useCallback } from 'react';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableFilters, setTableFilters] = useState({
    status: '',
    capacity: '',
    restaurantId: '',
    search: ''
  });

  const fetchTables = useCallback(async (restaurantId) => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/restaurants/${restaurantId}/tables`);
      const data = await response.json();
      setTables(data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  }, []);

  const createTable = useCallback(async (restaurantId, tableData) => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/restaurants/${restaurantId}/tables`, {
        method: 'POST',
        body: JSON.stringify(tableData),
      });
      const newTable = await response.json();
      setTables(prev => [...prev, newTable]);
      return newTable;
    } catch (error) {
      console.error('Error creating table:', error);
      throw error;
    }
  }, []);

  const updateTable = useCallback(async (tableId, tableData) => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/tables/${tableId}`, {
        method: 'PUT',
        body: JSON.stringify(tableData),
      });
      const updatedTable = await response.json();
      setTables(prev => prev.map(table => 
        table.id === tableId ? updatedTable : table
      ));
      return updatedTable;
    } catch (error) {
      console.error('Error updating table:', error);
      throw error;
    }
  }, []);

  const deleteTable = useCallback(async (tableId) => {
    try {
      // TODO: Implement API call
      await fetch(`/api/tables/${tableId}`, {
        method: 'DELETE',
      });
      setTables(prev => prev.filter(table => table.id !== tableId));
      if (selectedTable?.id === tableId) {
        setSelectedTable(null);
      }
    } catch (error) {
      console.error('Error deleting table:', error);
      throw error;
    }
  }, [selectedTable?.id]);

  const filterTables = useCallback((filters) => {
    setTableFilters(prev => ({ ...prev, ...filters }));
  }, []);

  const value = {
    tables,
    selectedTable,
    tableFilters,
    setSelectedTable,
    fetchTables,
    createTable,
    updateTable,
    deleteTable,
    filterTables,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};

export default TableContext;
