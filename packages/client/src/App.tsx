import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { trpc } from '@/config/trpc';

import './index.css';
import { useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const token = 'fake_token';

function App() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/v1/trpc',
          async headers() {
            return {
              authorization: `Bearer ${token}`,
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <h1 className='bg-red-800 text-blue-50 text-2xl'>
          Testing application!
        </h1>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
