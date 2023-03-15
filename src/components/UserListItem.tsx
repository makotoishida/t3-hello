import { api } from '../utils/api';
import { ActionIcon, Box, Text } from '@mantine/core';
import type { User } from '@prisma/client';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export function UserListItem({ item }: { item: User }) {
  const { data: session, status } = useSession();
  console.log('session', session, 'status=', status);

  const { refetch } = api.user.getAll.useQuery();
  const deleteItem = api.user.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = () => {
    deleteItem.mutate(
      { id: item.id },
      {
        onError: (err) => {
          console.log(err.message);
          alert(err.message);
        },
      }
    );
  };

  return (
    <>
      <Box
        key={item.id}
        my="0.4rem"
        sx={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}
      >
        <Text
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            overflowWrap: 'normal',
          }}
        >
          {item.name}
        </Text>
        <Link href={`/users/${item.id}`}>
          <ActionIcon>
            <IconEdit />
          </ActionIcon>
        </Link>
        <ActionIcon
          component="button"
          onClick={() => handleDelete()}
          disabled={deleteItem.isLoading || item.id === session?.user.id}
        >
          <IconTrash></IconTrash>
        </ActionIcon>
      </Box>
    </>
  );
}
