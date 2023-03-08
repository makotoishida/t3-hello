import { api } from '../utils/api';
import { ActionIcon, Box, Input, Text } from '@mantine/core';
import { Example } from '@prisma/client';
import {
  IconCircleCheck,
  IconCircleX,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import { useRef, useState } from 'react';

export function TaskListItem({ item }: { item: Example }) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { refetch } = api.example.getAll.useQuery();

  const update = api.example.update.useMutation({ onSuccess: () => refetch() });
  const deleteItem = api.example.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditDone = () => {
    const text = ref.current?.value || '';
    update.mutate(
      { id: item.id, text },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteItem.mutate({ id: item.id });
  };

  return (
    <>
      {isEditing ? (
        <Box
          key={item.id}
          my="0.4rem"
          sx={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}
        >
          <Input
            ref={ref}
            placeholder="Input a text"
            defaultValue={item.text}
            required
            sx={{ flexGrow: 1 }}
          />
          <ActionIcon
            component="button"
            color="red"
            onClick={() => handleEditCancel()}
          >
            <IconCircleX></IconCircleX>
          </ActionIcon>
          <ActionIcon
            component="button"
            color="blue"
            onClick={() => handleEditDone()}
            disabled={update.isLoading}
          >
            <IconCircleCheck></IconCircleCheck>
          </ActionIcon>
        </Box>
      ) : (
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
            {item.text}
          </Text>
          <ActionIcon
            component="button"
            onClick={() => handleEdit()}
            disabled={update.isLoading}
          >
            <IconEdit></IconEdit>
          </ActionIcon>
          <ActionIcon
            component="button"
            onClick={() => handleDelete()}
            disabled={deleteItem.isLoading}
          >
            <IconTrash></IconTrash>
          </ActionIcon>
        </Box>
      )}
    </>
  );
}
