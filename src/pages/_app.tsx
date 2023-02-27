"use client";
import { Footer, MantineProvider, useMantineTheme } from "@mantine/core";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { AppShell, Header, Navbar } from "@mantine/core";
import { useState } from "react";
import { api } from "../utils/api";
import { emotionCache } from "../utils/emotion-cache";
// import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
            <Navbar
              p="xs"
              width={{ xs: 200 }}
              hiddenBreakpoint="xs"
              hidden={!opened}
            >
              <div>Navbar</div>
            </Navbar>
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
