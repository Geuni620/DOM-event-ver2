import 'src/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { App } from 'src/App';
import { QueryProvider } from 'src/components/common/QueryProvider';
import { ReleaseCheck } from 'src/release-check';

import { MyForm } from './my-form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/release/check',
    element: <ReleaseCheck />,
  },
  {
    path: '/my-form',
    element: <MyForm />,
  },
]);

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
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </QueryProvider>
    </React.StrictMode>,
  );
});
