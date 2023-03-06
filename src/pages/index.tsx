"use client";

import { api } from "../utils/api";
import { Center, Container, Space, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

function Demo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Container p="4">
      <DatePicker onChange={setSelectedDate} value={selectedDate} />
    </Container>
  );
}

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const res = api.example.getAll.useQuery();
  const { data, error, isError } = res;
  console.log({ res, status: res.status, error: res.error });

  if (isError) {
    return <Container p="sm">{error.message}</Container>;
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
          align="center"
          order={2}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        >
          {hello.data?.greeting}
        </Title>
        <Space h={24}></Space>
        <Demo></Demo>
        {data && data.length ? (
          <ul>
            {data.map((item, index) => (
              <li key={item.id}>
                <Space h={24}></Space>
                <Text>
                  {index + 1} {item.text}
                </Text>
              </li>
            ))}
          </ul>
        ) : (
          <Center>No data found</Center>
        )}
      </Container>
    </>
  );
};

export default Home;
