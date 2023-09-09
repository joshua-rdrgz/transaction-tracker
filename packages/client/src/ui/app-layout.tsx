import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div>
      This is the app layout. You're signed in and made it!
      <div>
        <Outlet />
      </div>
    </div>
  );
};
