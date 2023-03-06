"use client";

import { api } from "../utils/api";
import { emotionCache } from "../utils/emotion-cache";
import {
  Button,
  Footer,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { AppShell, Header, Navbar } from "@mantine/core";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useState } from "react";

// import "../styles/globals.css";

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
          colorScheme: "light",
          // colorScheme: "dark",
        }}
        emotionCache={emotionCache}
      >
        <AppShell
          padding="sm"
          navbar={
            opened ? (
              <Navbar p="xs" width={{ xs: 200 }} hiddenBreakpoint="xs" hidden>
                <Button
                  variant="default"
                  compact
                  w={28}
                  onClick={() => setOpened(false)}
                >
                  &lt;
                </Button>
                <div>Navbar</div>
              </Navbar>
            ) : (
              <Navbar p="xs" width={{ xs: 20 }} hiddenBreakpoint="xs" hidden>
                <Button
                  variant="default"
                  compact
                  w={28}
                  onClick={() => setOpened(true)}
                >
                  &gt;
                </Button>
              </Navbar>
            )
          }
          header={
            <Header height={60} p="xs">
              <div>Header</div>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
          footer={
            <Footer height={60} p="md">
              Application footer
            </Footer>
          }
        >
          {/* Your application here */}
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
