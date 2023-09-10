import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className='flex flex-col justify-between min-h-screen bg-amber-100 text-gray-900 py-10 px-7 text-center'>
      <header className='text-4xl'>Welcome to BudgetBook!</header>
      <main>
        <LoginForm />
      </main>
      <footer className=''>
        Haven't registered?
        <Link to='/signup'>
          <span className='text-emerald-300 underline'>Signup here</span>
        </Link>
      </footer>
    </div>
  );
}
