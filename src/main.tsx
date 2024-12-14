import 'src/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import { App } from 'src/App';
import { QueryProvider } from 'src/components/common/QueryProvider';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('src/mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryProvider>
        <Toaster />
        <App />
      </QueryProvider>
    </React.StrictMode>,
  );
});
