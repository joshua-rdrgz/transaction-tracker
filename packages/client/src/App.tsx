import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster, toast } from 'react-hot-toast';

import { ThemeProvider } from '@/features/theme/theme-provider';
import { ErrorBoundary } from 'react-error-boundary';

import { trpc } from '@/config/trpc';

import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { AppLayout } from '@/ui/app-layout';

import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import Settings from '@/pages/Settings';
import ErrorPage from '@/pages/Error';

import './index.css';

const onError = (error: any) => {
  toast.error(`Something went wrong: ${error.message}`);
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError }),
  mutationCache: new MutationCache({ onError }),
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: false,
      useErrorBoundary: true,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/v1/trpc',
      /**
       * Allows cookies to send cross-origin
       * See: https://trpc.io/docs/client/cors
       */
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});

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
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to='/dashboard' />} />
        <Route path='dashboard' element={<div>Dashboard / Home</div>} />
        <Route path='accounts' element={<div>Accounts</div>} />
        <Route path='budget' element={<div>Budget (Year)</div>} />
        <Route path='budget/:monthId' element={<div>Budget (Month)</div>} />
        <Route path='settings' element={<Settings />} />
      </Route>

      {/* PUBLIC ROUTES */}
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position='top-center' />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}

export default App;
