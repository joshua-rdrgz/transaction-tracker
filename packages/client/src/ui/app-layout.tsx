import { Outlet } from 'react-router-dom';

import { Header } from '@/ui/header';
import { Sidebar } from '@/ui/sidebar';

export const AppLayout = () => {
  return (
    <div className='grid grid-cols-[13rem_1fr] grid-rows-[auto_1fr] h-screen'>
      <Header />
      <Sidebar />
      <main className='overflow-auto scrollb px-6 py-4'>
        <div className='max-w-5xl mx-auto flex flex-col gap-6'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
