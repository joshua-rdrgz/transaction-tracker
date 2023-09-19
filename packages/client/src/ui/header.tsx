import { ModeToggle } from '@/features/theme/ModeToggle';

export const Header = () => {
  return (
    <header className='bg-secondary flex items-center justify-end py-2 pr-3'>
      <ModeToggle />
    </header>
  );
};
