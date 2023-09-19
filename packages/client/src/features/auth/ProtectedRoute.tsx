import { useNavigate } from 'react-router-dom';
import { useUser } from '@/features/auth/useUser';
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
    console.log('USE EFFECT RENDERED');
    console.log('isAuthenticated: ', isAuthenticated);
    console.log('isLoadingUser: ', isLoadingUser);
    if (!isAuthenticated && !isLoadingUser) {
      console.log('NOT LOGGED IN, REROUTING TO LOGIN PAGE');
      navigate('/login');
    }
  }, [isAuthenticated, isLoadingUser]);

  if (isLoadingUser) {
    return <div>Loading....</div>;
  }

  if (isAuthenticated) return children;
};
