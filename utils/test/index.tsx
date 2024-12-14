// import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as RtlRender } from '@testing-library/react';
import { ReactElement } from 'react';

import { queryClientOptions } from '@/lib/query';

/**
 * @cc
 * https://tkdodo.eu/blog/testing-react-query
 * https://github.com/bonnie/udemy-REACT-QUERY/blob/main/completed-apps/lazy-days-spa/client/src/test-utils/index.tsx
 * https://github.com/TkDodo/testing-react-query/blob/main/src/tests/utils.tsx
 *
 */

export const createQueryClientWrapper = () => {
  const queryClient = new QueryClient({
    ...queryClientOptions,
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const generateQueryClient = () => {
  return new QueryClient({
    ...queryClientOptions,
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

export const customRender = (ui: ReactElement, client?: QueryClient) => {
  const queryClient = client ?? generateQueryClient();

  return RtlRender(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
