import { trpc } from '@/config/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLoggingOut, mutate: logout } = trpc.logout.useMutation({
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return {
    isLoggingOut,
    logout,
  };
};
