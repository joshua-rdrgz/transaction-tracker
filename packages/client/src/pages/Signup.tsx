import { Link } from 'react-router-dom';
import { SignupForm } from '@/features/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className='flex flex-col justify-between min-h-screen bg-amber-100 text-gray-900 py-10 px-7 text-center'>
      <header className='text-4xl'>Welcome to BudgetBook!</header>
      <main>
        <SignupForm />
      </main>
      <footer className=''>
        Already registered?{' '}
        <Link to='/login'>
          <span className='text-emerald-300 underline'>Login here</span>
        </Link>
      </footer>
    </div>
  );
}
