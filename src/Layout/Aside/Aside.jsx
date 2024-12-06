import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPeople, MdRestaurant, MdTableBar, MdEventNote, MdSettings } from 'react-icons/md';
import './Aside.css';

const menuItems = [
  { path: '/dashboard', name: 'Dashboard', icon: MdDashboard },
  { path: '/users', name: 'Users', icon: MdPeople },
  { path: '/restaurants', name: 'Restaurants', icon: MdRestaurant },
  { path: '/tables', name: 'Tables', icon: MdTableBar },
  { path: '/reservations', name: 'Reservations', icon: MdEventNote },
  { path: '/settings', name: 'Settings', icon: MdSettings },
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
            <span className="nav-icon">
              {React.createElement(item.icon)}
            </span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
