import { Context } from "@/trpc/fetch-context.ts";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
