import { useNavigate } from 'react-router-dom';

import { trpc } from '@/config/trpc';
import { toast } from 'react-hot-toast';

export const useSignup = () => {
  const navigate = useNavigate();

  const { isLoading, mutate } = trpc.signup.useMutation({
    onSuccess: (_, variables) => {
      navigate('/', { replace: true });
      toast.success(`Successfully signed up.  Welcome, ${variables.name}!`);
    },
  });

  return {
    isSigningUp: isLoading,
    signup: mutate,
  };
};
