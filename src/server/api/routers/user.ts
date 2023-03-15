import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ orderBy: [{ id: 'asc' }] });
  }),

  add: protectedProcedure
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

  update: protectedProcedure
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

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log('tRPC delete():', input);
      return ctx.prisma.user.delete({
        where: { id: input.id },
      });
    }),
});
