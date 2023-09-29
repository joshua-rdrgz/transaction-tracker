import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/features/theme/theme-provider';
import { ErrorBoundary } from 'react-error-boundary';

import { queryClient } from '@/config/queryClient';
import { trpcReactClient, TRPCProvider } from '@/config/trpc';

import { accountsPageLoader } from '@/features/accounts/fetchers/accountsPage';
import { currentUserLoader } from '@/features/auth/fetchers/currentUser';

import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { AppLayout } from '@/ui/app-layout';

import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import AccountsPage from '@/pages/Accounts';
import SettingsPage from '@/pages/Settings';
import ErrorPage from '@/pages/Error';
import NotFoundPage from '@/pages/NotFound';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          onReset={() => window.location.replace('/login')}
        >
          <Outlet />
        </ErrorBoundary>
      }
    >
      {/* PROTECTED ROUTES */}
      <Route
        loader={currentUserLoader(queryClient)}
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to='/dashboard' />} />
        <Route path='dashboard' element={<div>Dashboard / Home</div>} />
        <Route
          path='accounts'
          loader={accountsPageLoader(queryClient)}
          element={<AccountsPage />}
        />
        <Route path='budget' element={<div>Budget (Year)</div>} />
        <Route path='budget/:monthId' element={<div>Budget (Month)</div>} />
        <Route path='settings' element={<SettingsPage />} />
      </Route>

      {/* PUBLIC ROUTES */}
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider>
      <TRPCProvider client={trpcReactClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position='top-center' />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}

export default App;
