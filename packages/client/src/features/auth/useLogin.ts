import { useNavigate } from 'react-router-dom';
import { trpc } from '@/config/trpc';

export const useLogin = () => {
  const navigate = useNavigate();
  const { isLoading, mutate } = trpc.login.useMutation({
    onSuccess: () => navigate('/', { replace: true }),
  });

  return {
    isLoggingIn: isLoading,
    login: mutate,
  };
};
