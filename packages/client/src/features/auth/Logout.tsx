import { Button } from '@/ui/button';
import { LogOut } from 'lucide-react';
import { useLogout } from '@/features/auth/hooks/useLogout';

export const Logout = () => {
  const { isLoggingOut, logout } = useLogout();

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => logout()}
      disabled={isLoggingOut}
    >
      <LogOut size={20} />
    </Button>
  );
};
