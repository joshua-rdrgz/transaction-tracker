import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const onError = (error: any) => {
  toast.error(`Something went wrong: ${error.message}`);
};

export const queryClient = new QueryClient({
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
