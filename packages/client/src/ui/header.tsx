import { ModeToggle } from '@/features/theme/ModeToggle';
import { UserAvatar } from '@/features/auth/UserAvatar';
import { Logout } from '@/features/auth/Logout';

export const Header = () => {
  return (
    <header className='bg-secondary flex items-center gap-6 justify-end py-2 pr-3'>
      <UserAvatar />
      <section className='flex gap-2'>
        <ModeToggle />
        <Logout />
      </section>
    </header>
  );
};
