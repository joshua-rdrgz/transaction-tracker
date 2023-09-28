import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from '@trpc/react-query';
import { AppRouter } from 'api-server';

export const trpc = createTRPCReact<AppRouter>();

export const trpcReactClient = trpc.createClient({
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

export const trpcVanillaClient = createTRPCProxyClient<AppRouter>({
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

export const TRPCProvider = trpc.Provider;
