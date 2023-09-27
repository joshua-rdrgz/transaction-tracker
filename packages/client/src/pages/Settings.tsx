import { UpdateUserForm } from '@/features/auth/forms/UpdateUserForm';
import { UpdatePasswordForm } from '@/features/auth/forms/UpdatePasswordForm';

export default function SettingsPage() {
  return (
    <div className='flex flex-col gap-10'>
      <section className='flex flex-col gap-3'>
        <div className='font-display text-xl'>Update Your Info</div>
        <UpdateUserForm />
      </section>
      <section className='flex flex-col gap-3'>
        <div className='font-display text-xl'>Update Your Password</div>
        <UpdatePasswordForm />
      </section>
    </div>
  );
}
