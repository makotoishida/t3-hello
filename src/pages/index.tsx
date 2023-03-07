"use client";

import { api } from "../utils/api";
import { TaskList } from "./TaskList";
import { Container, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

function DateSelector() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Container p="4">
      <DatePicker onChange={setSelectedDate} value={selectedDate} />
    </Container>
  );
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

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
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        >
          {hello.data?.greeting}
        </Title>
        <DateSelector></DateSelector>
        <TaskList></TaskList>
      </Container>
    </>
  );
};

export default Home;
