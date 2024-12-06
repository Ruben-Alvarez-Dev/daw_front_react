import React from 'react';
import { NavLink } from 'react-router-dom';
import './Aside.css';

const menuItems = [
  { path: '/dashboard', name: 'Dashboard', icon: '📊' },
  { path: '/users', name: 'Users', icon: '👥' },
  { path: '/restaurants', name: 'Restaurants', icon: '🍽️' },
  { path: '/tables', name: 'Tables', icon: '🪑' },
  { path: '/reservations', name: 'Reservations', icon: '📅' },
  { path: '/settings', name: 'Settings', icon: '⚙️' },
];

const Aside = () => {
  return (
    <aside className="aside">
      <nav className="aside-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
