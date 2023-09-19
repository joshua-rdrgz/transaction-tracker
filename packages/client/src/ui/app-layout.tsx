import { Outlet } from 'react-router-dom';

import { Header } from '@/ui/header';
import { Sidebar } from '@/ui/sidebar';

export const AppLayout = () => {
  return (
    <div className='grid grid-cols-[13rem_1fr] grid-rows-[auto_1fr] h-screen'>
      <Header />
      <Sidebar />
      <div className='overflow-scroll'>
        <Outlet />
      </div>
    </div>
  );
};
