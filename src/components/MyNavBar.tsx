import { Button, Navbar } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';

type Props = {
  opened: boolean;
  // session: Session | null;
  setOpened: (v: boolean) => void;
};

export function MyNavBar({ opened, setOpened }: Props) {
  const { data: session, status } = useSession();
  console.log('Rendering MyNavBar: ', session);

  function handleSignOut(): void {
    signOut().catch((e) => console.log(e));
  }

  return opened ? (
    <Navbar p="xs" width={{ xs: 200 }} hiddenBreakpoint="xs" hidden>
      <Button variant="default" compact w={28} onClick={() => setOpened(false)}>
        &lt;
      </Button>
      {status !== 'loading' && session && session.user ? (
        <>
          <div>User: {session?.user.name}</div>
          <Button onClick={handleSignOut}>Sign out</Button>
        </>
      ) : null}
    </Navbar>
  ) : (
    <Navbar p="xs" width={{ xs: 20 }} hiddenBreakpoint="xs" hidden>
      <Button variant="default" compact w={28} onClick={() => setOpened(true)}>
        &gt;
      </Button>
    </Navbar>
  );
}
