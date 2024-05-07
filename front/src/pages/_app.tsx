import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import * as React from 'react';
import BottomMenu from '@/components/BottonMenu';
import Header from '@/components/Header';
import NotiSnackbar from '@/components/NotiSnackbar';
import CurrentUserFetcher from '@/components/currentUserFetcher';

import createEmotionCache from '@/styles/createEmotionCache';
import theme from '@/styles/theme';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CurrentUserFetcher />
        <Header />
        <Component {...pageProps} />
        <NotiSnackbar />
        <BottomMenu />
      </ThemeProvider>
    </CacheProvider>
  );
}
