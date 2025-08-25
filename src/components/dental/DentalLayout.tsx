
import React from 'react';
import { Outlet } from 'react-router-dom';
import DentalHeader from './DentalHeader';
import DentalFooter from './DentalFooter';

const DentalLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DentalHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <DentalFooter />
    </div>
  );
};

export default DentalLayout;
