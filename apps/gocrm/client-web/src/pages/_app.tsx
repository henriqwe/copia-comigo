import { ApolloProvider } from '@apollo/client';

import type { AppProps /*, AppContext */ } from 'next/app';
import { useEffect } from 'react';

import '@lourenci/react-kanban/dist/styles.css';
import 'react-loading-skeleton/dist/skeleton.css';

import '../styles/app.css';

import { useApollo } from '../utils/apollo';
import NextNprogress from 'nextjs-progressbar';

import '../utils/amplifyConfig';
import { useUser, UserProvider } from '../contexts/UserContext';
import { ThemeProvider, useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';

export default function WrapperApp({
  Component,
  pageProps,
  ...rest
}: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider>
        <App Component={Component} pageProps={pageProps} {...rest} />
      </ThemeProvider>
    </UserProvider>
  );
}

function App({ Component, pageProps }: AppProps) {
  const { user } = useUser();
  const { theme } = useTheme();
  const client = useApollo(pageProps.initialApolloState, user);

  useEffect(() => {
    theme === 'dark'
      ? document.querySelector('html')?.classList.add('dark')
      : document.querySelector('html')?.classList.remove('dark');
  });

  return (
    <ApolloProvider client={client}>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  );
}
