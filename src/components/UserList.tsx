import { api } from '../utils/api';
import { UserListItem } from './UserListItem';
import { ActionIcon, Box, Center, Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export function UserList() {
  const { data, error, isError, refetch } = api.user.getAll.useQuery();
  const add = api.user.add.useMutation({ onSuccess: () => refetch() });

  if (isError) {
    return <Container p="sm">{error.message}</Container>;
  }

  const handleAdd = () => {
    add.mutate({ name: 'User', email: '', username: '' });
  };

  return (
    <>
      {data && data.length ? (
        <Box my="2em">
          {data.map((item) => (
            <UserListItem key={item.id} item={item} />
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
