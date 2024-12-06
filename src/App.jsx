import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import './styles/global.css';

// Importar las vistas
import Dashboard from './views/Dashboard/Dashboard';
import Reservations from './views/Reservations/Reservations';
import Restaurants from './views/Restaurants/Restaurants';
import Tables from './views/Tables/Tables';
import Users from './views/Users/Users';
import Settings from './views/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="tables" element={<Tables />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
