"use client";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { Container, Space, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { api } from "../utils/api";

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
          ようこそ T3 App へ!
        </Title>
        <Space h={24}></Space>
        <Demo></Demo>
        {Array.from(new Array(20).keys()).map((i) => (
          <>
            <Space h={24}></Space>
            <Text>{i + 1} これはテキストです。</Text>
          </>
        ))}
      </Container>
    </>
  );
};

export default Home;
