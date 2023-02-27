import { MantineProvider } from "@mantine/core";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "../utils/api";
import { emotionCache } from '../utils/emotion-cache';

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
        /** Put your mantine theme override here */
          colorScheme: "light",
          // colorScheme: "dark",
        }}
        emotionCache={emotionCache}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
