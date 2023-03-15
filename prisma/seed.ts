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
  const password = 'TEst09#!';
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

  const test2User = await prisma.user.upsert({
    where: { username: 'test2' },
    update: {},
    create: {
      email: 'test2@test.com',
      name: 'テスト2',
      username: 'test2',
      password_hash: hashedPassword,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { username: 'mike' },
    update: {},
    create: {
      email: 'mike@test.com',
      name: 'Mike Test',
      username: 'mike',
      password_hash: hashedPassword,
      role: 'ADMIN',
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
