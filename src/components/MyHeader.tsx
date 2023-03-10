import { Header, Title } from '@mantine/core';

export function MyHeader() {
  return (
    <Header height={90} p="xs">
      <div>
        <Title
          mb="1em"
          align="center"
          order={2}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        >
          My T3 App Example
        </Title>
      </div>
    </Header>
  );
}
