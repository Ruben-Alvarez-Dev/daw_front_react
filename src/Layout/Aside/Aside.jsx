import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Aside.module.css';

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
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.text}>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
