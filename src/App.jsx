import { Routes, Route, Navigate } from 'react-router-dom';
import { RestaurantProvider } from './contexts/RestaurantContext';
import { UserProvider } from './contexts/UserContext';
import Layout from './Layout/Layout';
import Users from './components/specific/users/Users';
import RestaurantList from './components/specific/restaurants/RestaurantList';
import Tables from './components/specific/tables/Tables';
import Reservations from './components/specific/reservations/Reservations';
import Settings from './components/specific/settings/Settings';

function App() {
  return (
    <UserProvider>
      <RestaurantProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/users" replace />} />
            <Route path="users" element={<Users />} />
            <Route path="restaurants" element={<RestaurantList />} />
            <Route path="tables" element={<Tables />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Route>
        </Routes>
      </RestaurantProvider>
    </UserProvider>
  );
}

export default App;
