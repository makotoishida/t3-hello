import { api } from '../utils/api';
import { Button, Flex, Input, List, Text } from '@mantine/core';
import { Example } from '@prisma/client';
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
    <List.Item key={item.id}>
      {isEditing ? (
        <Flex gap={'0.4rem'}>
          <Input
            ref={ref}
            placeholder="Input a text"
            defaultValue={item.text}
            required
          />
          <Button onClick={() => handleEditCancel()}>Cancel</Button>
          <Button onClick={() => handleEditDone()} disabled={update.isLoading}>
            Save
          </Button>
        </Flex>
      ) : (
        <Flex gap={'0.4rem'}>
          <Text>{item.text}</Text>
          <Button onClick={() => handleEdit()} disabled={update.isLoading}>
            Edit
          </Button>
          <Button
            onClick={() => handleDelete()}
            disabled={deleteItem.isLoading}
          >
            Delete
          </Button>
        </Flex>
      )}
    </List.Item>
  );
}
