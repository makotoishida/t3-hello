"use client";

import { api } from "../utils/api";
import {
  Button,
  Center,
  Container,
  Flex,
  List,
  Text,
  Title,
} from "@mantine/core";
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

  const res = api.example.getAll.useQuery();
  const { data, error, isError, refetch } = res;

  const add = api.example.add.useMutation({ onSuccess: () => refetch() });
  const update = api.example.update.useMutation({ onSuccess: () => refetch() });
  const deleteItem = api.example.delete.useMutation({
    onSuccess: () => refetch(),
  });

  if (isError) {
    return <Container p="sm">{error.message}</Container>;
  }

  const handleAdd = () => {
    add.mutate({ text: "ハロー" });
  };

  const handleEdit = (id: string, text: string) => {
    update.mutate({ id, text });
  };

  const handleDelete = (id: string) => {
    deleteItem.mutate({ id });
  };

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
        {data && data.length ? (
          <List my="2em" spacing="md" listStyleType="none">
            {data.map((item) => (
              <List.Item key={item.id}>
                <Flex gap={"0.4rem"}>
                  <Text>{item.text}</Text>
                  <Button
                    onClick={() => handleEdit(item.id, item.text + "a")}
                    disabled={update.isLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleteItem.isLoading}
                  >
                    Delete
                  </Button>
                </Flex>
              </List.Item>
            ))}
          </List>
        ) : (
          <Center my="2em" c="gray">
            No data found
          </Center>
        )}
        <Center>
          <Button onClick={handleAdd} disabled={add.isLoading}>
            Add
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default Home;
