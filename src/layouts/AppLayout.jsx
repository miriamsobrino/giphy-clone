import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const AppLayout = () => {
  return (
    <div className='bg-background min-h-screen text-white'>
      <div className=' sm:w-full p-4 md:w-full lg:w-full xl:w-8/12 lg:px-12 mx-auto'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
