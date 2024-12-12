import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Rutas en las que no quieres que se muestre el Navbar
  const hideNavbarRoutes = ['/login', '/register'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
