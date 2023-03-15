'use client';

import { SignIn } from '../../components/SignIn';
import { UserList } from '../../components/UserList';
import { Container, Title } from '@mantine/core';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const UsersPage: NextPage = () => {
  const { data: session, status } = useSession();

  console.log('session', session, 'status=', status);

  if (status == 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return <SignIn />;
  }

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Container p="sm">
        <Title
          mb="1em"
          align="center"
          order={2}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >
          Users
        </Title>
        <UserList></UserList>
      </Container>
    </>
  );
};

export default UsersPage;
