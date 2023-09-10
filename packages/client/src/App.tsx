  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster, toast } from 'react-hot-toast';

import { trpc } from '@/config/trpc';

import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { AppLayout } from '@/ui/app-layout';

import Signup from '@/pages/Signup';

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

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            {/* PROTECTED ROUTES */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to='/dashboard' />} />
              <Route
                path='dashboard'
                element={
                  <div>This is the home page. You're signed in, yay!</div>
                }
              />
            </Route>

            {/* UNPROTECTED ROUTES */}
            <Route path='signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
