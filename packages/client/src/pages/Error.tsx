import { FallbackProps } from 'react-error-boundary';

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      <header>Uh oh, something went wrong.... 🧐</header>
      <main>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Go Back</button>
      </main>
    </div>
  );
}
