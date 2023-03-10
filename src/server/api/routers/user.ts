import { createTRPCRouter, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({ orderBy: [{ id: 'asc' }] });
  }),

  add: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log('tRPC add():', input);
      return ctx.prisma.example.create({
        data: {
          text: input.text,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      console.log('tRPC update():', input);
      return ctx.prisma.example.update({
        where: { id: input.id },
        data: {
          text: input.text,
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
      return ctx.prisma.example.delete({
        where: { id: input.id },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
