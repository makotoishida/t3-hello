import { api } from '../utils/api';
import { TaskListItem } from './TaskListItem';
import { ActionIcon, Box, Center, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export function TaskList() {
  const { data, error, isError, refetch } = api.example.getAll.useQuery();
  const add = api.example.add.useMutation({ onSuccess: () => refetch() });

  if (isError) {
    return <Container p="sm">{error.message}</Container>;
  }

  const handleAdd = () => {
    add.mutate({ text: 'ハロー' });
  };

  return (
    <>
      {data && data.length ? (
        <Box my="2em">
          {data.map((item) => (
            <TaskListItem key={item.id} item={item} />
          ))}
        </Box>
      ) : (
        <Center my="2em" c="gray">
          No data found
        </Center>
      )}
      <Center>
        <ActionIcon
          component="button"
          onClick={handleAdd}
          disabled={add.isLoading}
        >
          <IconPlus></IconPlus>
        </ActionIcon>
      </Center>
    </>
  );
}
