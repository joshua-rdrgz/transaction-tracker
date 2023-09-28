import { useMoveBack } from '@/hooks/useMoveBack';
import { Button } from '@/ui/button';

export default function NotFoundPage() {
  const moveBack = useMoveBack();

  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center gap-4'>
      <h1 className='font-display text-4xl w-1/2 text-center'>
        We couldn't find that page 😢
      </h1>
      <Button onClick={moveBack}>&larr; Go back</Button>
    </main>
  );
}
