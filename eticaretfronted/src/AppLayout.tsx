import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />   {/* Route’lar buraya render edilecek */}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
