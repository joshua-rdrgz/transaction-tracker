import { Link } from 'react-router-dom';

interface IAuthPageLayoutProps {
  formTitle: string;
  formSubtitle: string;
  formComponent: React.ReactElement;
  footerLabel: string;
  footerLinkLabel: string;
  footerLinksTo: '/login' | '/signup';
}

export const AuthPageLayout: React.FC<IAuthPageLayoutProps> = ({
  formTitle,
  formSubtitle,
  formComponent,
  footerLabel,
  footerLinkLabel,
  footerLinksTo,
}) => {
  return (
    <div className='flex flex-col justify-between min-h-screen bg-gray-200 text-gray-900 py-10 px-7 text-center'>
      <header className='text-4xl'>
        <figure className='w-1/3 mx-auto'>
          <img src='/logo-color.svg' className='w-full' />
        </figure>
      </header>
      <main>
        <div className='flex flex-col gap-4'>
          <h1 className='font-display text-5xl text-orange-950'>{formTitle}</h1>
          <p className='text-orange-900'>{formSubtitle}</p>
          <div className='w-full mx-auto bg-gray-50 rounded-md py-5 px-6 sm:w-3/4 md:w-1/2 xl:w-1/3'>
            {formComponent}
          </div>
        </div>
      </main>
      <footer className=''>
        {footerLabel}{' '}
        <Link to={footerLinksTo}>
          <span className='text-orange-950 underline'>{footerLinkLabel}</span>
        </Link>
      </footer>
    </div>
  );
};
