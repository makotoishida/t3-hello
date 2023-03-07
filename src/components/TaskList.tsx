import { api } from '../utils/api';
import { TaskListItem } from './TaskListItem';
import { Button, Center, Container, List } from '@mantine/core';

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
        <List my="2em" spacing="md" listStyleType="none">
          {data.map((item) => (
            <TaskListItem key={item.id} item={item} />
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
    </>
  );
}
