import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  Link,
} from '@tanstack/react-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Meta, Scripts } from '@tanstack/start';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();
  
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
         title: 'TanStack Start Starter',
      },
    ],
  }),
  component: RootComponent,
})
  
function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </QueryClientProvider>
  );
}
  
function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <nav style={{ padding: '1rem' }}>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/weather">Weather</Link>
          {' | '}
          <Link to="/time">Time</Link>
        </nav>
        {children}
        <ScrollRestoration />
        <Scripts />
        <ReactQueryDevtools initialIsOpen={false} />
      </body>
    </html>
  );
}
