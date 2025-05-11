import { createContext } from 'react';
import dataStore from '../data';

// Create context
export const DataContext = createContext(null);

// Context provider component
export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={dataStore}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;