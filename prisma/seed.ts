import { prisma } from '../src/server/db';
import * as bcrypt from 'bcrypt';

async function main() {
  const id = 'cl9ebqhxk00003b600tymydho';
  await prisma.example.upsert({
    where: {
      id,
    },
    create: {
      id,
      text: 'test data 1',
    },
    update: {
      text: 'test data 1',
    },
  });

  await createUsers();
}

async function createUsers() {
  const saltRounds = 10;
  const password = 'test';
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const testUser = await prisma.user.upsert({
    where: { username: 'test' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'テスト',
      username: 'test',
      password_hash: hashedPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
