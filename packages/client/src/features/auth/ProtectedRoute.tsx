import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/ui/spinner';
import { useUser } from '@/features/auth/hooks/useUser';

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingUser } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) navigate('/login');
  }, [isAuthenticated, isLoadingUser]);

  if (isLoadingUser) return <Spinner size={50} fullScreen />;

  if (isAuthenticated) return children;
};
