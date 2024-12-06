import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Aside from './Aside/Aside';
import Footer from './Footer/Footer';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-container">
        <Aside />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
