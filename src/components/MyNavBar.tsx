import { Box, Button, Navbar } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  opened: boolean;
  // session: Session | null;
  setOpened: (v: boolean) => void;
};

export function MyNavBar({ opened, setOpened }: Props) {
  const { data: session, status } = useSession();
  // console.log('Rendering MyNavBar: ', session);

  function handleSignOut(): void {
    signOut().catch((e) => console.log(e));
  }

  return opened ? (
    <Navbar p="xs" width={{ xs: 200 }} hiddenBreakpoint="xs" hidden>
      <Button
        variant="default"
        compact
        mb="1rem"
        w={28}
        onClick={() => setOpened(false)}
      >
        &lt;
      </Button>

      <Box my="0.2rem ">
        <Link href="/">Home</Link>
      </Box>

      <Box my="0.2rem ">
        <Link href="/users/">Users</Link>
      </Box>

      {status !== 'loading' && session && session.user ? (
        <Box my="1rem">
          <div>User: {session?.user.name}</div>
          <Button type="button" onClick={handleSignOut}>
            Sign out
          </Button>
        </Box>
      ) : null}
    </Navbar>
  ) : (
    <Navbar p="xs" width={{ xs: 20 }} hiddenBreakpoint="xs" hidden>
      <Button
        variant="default"
        compact
        mb="1rem"
        w={28}
        onClick={() => setOpened(true)}
      >
        &gt;
      </Button>
    </Navbar>
  );
}
