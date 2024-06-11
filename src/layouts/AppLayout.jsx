import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AppLayout = () => {
  return (
    <div className='bg-background min-h-screen text-white'>
      <div className=' sm:container lg:w-7/12 px-12 py-4 mx-auto'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
