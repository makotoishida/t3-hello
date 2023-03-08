import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany({ orderBy: [{ id: 'asc' }] });
  }),

  add: publicProcedure
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

  update: publicProcedure
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

  delete: publicProcedure
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
