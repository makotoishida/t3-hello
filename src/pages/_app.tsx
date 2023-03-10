'use client';

import { MyFooter } from '../components/MyFooter';
import { MyHeader } from '../components/MyHeader';
import { MyNavBar } from '../components/MyNavBar';
import '../styles/globals.css';
import { api } from '../utils/api';
import { emotionCache } from '../utils/emotion-cache';
import { AppShell, MantineProvider, useMantineTheme } from '@mantine/core';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { useState } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(true);

  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          // colorScheme: "dark",
        }}
        emotionCache={emotionCache}
      >
        <AppShell
          padding="sm"
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
          navbar={<MyNavBar {...{ opened, session, setOpened }} />}
          header={<MyHeader />}
          footer={<MyFooter />}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
