import { useNavigate } from 'react-router-dom';
import { useUser } from '@/features/auth/hooks/useUser';
import { useEffect } from 'react';

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

  if (isLoadingUser) {
    return <div>Loading....</div>;
  }

  if (isAuthenticated) return children;
};
