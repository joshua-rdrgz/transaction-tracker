import { trpc } from '@/config/trpc';

export const useLogin = () => {
  const { isLoading, mutate } = trpc.login.useMutation();

  return {
    isLoggingIn: isLoading,
    login: mutate,
  };
};
