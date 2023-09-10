import { trpc } from '@/config/trpc';
import { toast } from 'react-hot-toast';

export const useSignup = () => {
  const { isLoading, mutate } = trpc.signup.useMutation({
    onSuccess: (_, variables) => {
      toast.success(`Successfully signed up.  Welcome, ${variables.name}!`);
    },
  });

  return {
    isSigningUp: isLoading,
    signup: mutate,
  };
};
