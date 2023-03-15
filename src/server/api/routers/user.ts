import { adminOnlyProcedure, createTRPCRouter } from '../trpc';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
  getAll: adminOnlyProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ orderBy: [{ id: 'asc' }] });
  }),

  add: adminOnlyProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        username: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log('tRPC add():', input);
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          username: input.username,
        },
      });
    }),

  update: adminOnlyProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        username: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log('tRPC update():', input);
      return ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          username: input.username,
        },
      });
    }),

  delete: adminOnlyProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log('tRPC delete():', input);

      if (ctx.session.user.role !== 'ADMIN') {
        throw new Error(`Not authorized.`);
      }
      if (input.id === ctx.session.user.id) {
        throw new Error(`You cannot delete the current user.`);
      }

      return ctx.prisma.user.delete({
        where: { id: input.id },
      });
    }),
});
