import { Button, Navbar } from '@mantine/core';
import { Session } from 'next-auth';

type Props = {
  opened: boolean;
  session: Session | null;
  setOpened: (v: boolean) => void;
};

export function MyNavBar({ opened, session, setOpened }: Props) {
  return opened ? (
    <Navbar p="xs" width={{ xs: 200 }} hiddenBreakpoint="xs" hidden>
      <Button variant="default" compact w={28} onClick={() => setOpened(false)}>
        &lt;
      </Button>
      <div>User: {session?.user.name}</div>
    </Navbar>
  ) : (
    <Navbar p="xs" width={{ xs: 20 }} hiddenBreakpoint="xs" hidden>
      <Button variant="default" compact w={28} onClick={() => setOpened(true)}>
        &gt;
      </Button>
    </Navbar>
  );
}
