import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/features/auth/hooks/useUser';

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated]);

  if (isAuthenticated) return children;
};
