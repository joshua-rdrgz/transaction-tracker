import { ModeToggle } from '@/features/theme/ModeToggle';
import { UserAvatar } from '@/features/auth/UserAvatar';

export const Header = () => {
  return (
    <header className='bg-secondary flex items-center gap-6 justify-end py-2 pr-3'>
      <UserAvatar />
      <ModeToggle />
    </header>
  );
};
