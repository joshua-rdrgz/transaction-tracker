import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';

import ErrorPage from '@/pages/Error.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    FallbackComponent={ErrorPage}
    onReset={() => window.location.replace('/login')}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>
);
