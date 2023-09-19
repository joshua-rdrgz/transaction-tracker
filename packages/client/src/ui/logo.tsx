import { useTheme } from '@/features/theme/theme-provider';
import { cn } from '@/lib/utils';

interface ILogoProps {
  figureClassName: string;
}
export const Logo: React.FC<ILogoProps> = ({ figureClassName }) => {
  const { theme } = useTheme();
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const src =
    theme === 'system'
      ? systemTheme === 'dark'
        ? '/logo-white.svg'
        : '/logo-color.svg'
      : theme === 'dark'
      ? '/logo-white.svg'
      : '/logo-color.svg';

  return (
    <figure className={cn('mx-auto', figureClassName)}>
      <img src={src} className='w-full' />
    </figure>
  );
};
