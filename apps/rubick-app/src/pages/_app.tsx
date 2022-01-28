import { AppProps } from 'next/app';

import '../styles/app.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}

export default CustomApp;
