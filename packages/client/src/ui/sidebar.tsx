import { NavLink } from 'react-router-dom';

import { Logo } from '@/ui/logo';
import { Home, PiggyBank, CircleDollarSign, Settings } from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Home',
    icon: Home,
    link: '/dashboard',
  },
  {
    label: 'Budget',
    icon: CircleDollarSign,
    link: '/budget',
  },
  {
    label: 'Accounts',
    icon: PiggyBank,
    link: '/accounts',
  },
  {
    label: 'Settings',
    icon: Settings,
    link: '/settings',
  },
];

export const Sidebar = () => {
  return (
    <aside className='row-span-full pt-5 px-4 flex flex-col gap-12 bg-secondary'>
      <Logo figureClassName='w-full' />
      <nav>
        <ul className='flex flex-col gap-6'>
          {NAV_ITEMS.map((navItem) => {
            const Icon = navItem.icon;
            return (
              <li key={navItem.label} className='group/li shadow-sm'>
                <NavLink
                  to={navItem.link}
                  className='flex gap-2 bg-background group-hover/li:bg-muted items-center rounded py-2 px-3 transition group/link'
                >
                  <Icon className='text-accent group-hover/li:text-accent-foreground group-[.active]/link:text-accent-foreground' />
                  <span>{navItem.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
