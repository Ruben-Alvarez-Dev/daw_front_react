import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Users from './components/specific/users/Users';
import Restaurants from './components/specific/restaurants/Restaurants';
import Tables from './components/specific/tables/Tables';
import Reservations from './components/specific/reservations/Reservations';
import Settings from './components/specific/settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="tables" element={<Tables />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
