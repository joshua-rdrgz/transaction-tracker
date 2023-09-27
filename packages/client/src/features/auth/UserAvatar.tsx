import { useUser } from '@/features/auth/useUser';

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <div className='flex gap-2 items-center'>
      <figure className='w-9'>
        <img
          src={
            user?.avatar
              ? `${process.env.SERVER_BASE_URL}${user.avatar}` ||
                '/default-user.png'
              : '/default-user.png'
          }
          alt='User Avatar'
          className='w-full rounded-full'
        />
      </figure>
      <span className='text-sm'>{user?.name}</span>
    </div>
  );
};
