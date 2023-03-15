import { prisma } from './db';
import type { UserRole } from '@prisma/client';
import { compare } from 'bcrypt';
import type { GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// import { PrismaAdapter } from '@next-auth/prisma-adapter';

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    // ...other properties
    username: string;
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, token, user }) {
      if (token && token.sub) {
        console.log('session callback: ', session, token, user);
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        console.log('JWT callback: ', token, user, account, profile, isNewUser);
        token.role = user.role;
      }
      return token;
    },
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Username',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: '' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        console.log('authorize', credentials);
        if (!credentials) return null;
        const { username, password } = credentials;
        if (!username || !password) return null;

        const user = await prisma.user.findFirst({ where: { username } });
        if (!user) return null;

        if (await compare(password, user.password_hash!)) {
          return user;
        }

        return null;
      },
    }),
  ],
  session: {
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
