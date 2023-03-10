'use client';

import { SignIn } from '../components/SignIn';
import { TaskList } from '../components/TaskList';
import { api } from '../utils/api';
import { Container, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';

function DateSelector() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Container p="4">
      <DatePicker onChange={setSelectedDate} value={selectedDate} />
    </Container>
  );
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { data: msg } = api.example.getSecretMessage.useQuery();

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
        <title>T3 Hello</title>
        <meta name="description" content="Hello T3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container p="sm">
        <Title
          mb="1em"
          align="center"
          order={2}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >
          Todo List
        </Title>
        {msg}
        <DateSelector></DateSelector>
        <TaskList></TaskList>
      </Container>
    </>
  );
};

export default Home;
