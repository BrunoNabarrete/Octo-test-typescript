import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
'use client;'

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   import('preline');
  // }, []);

  return <Component {...pageProps} />;
}
