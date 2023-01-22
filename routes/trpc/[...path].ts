import { HandlerContext, Handlers } from "$fresh/server.ts";
import { createContext } from "@/trpc/fetch-context.ts";
import { appRouter } from "@/trpc/server.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const handler: Handlers = {
  GET(req: Request, _ctx: HandlerContext) {
    return fetchRequestHandler({
      endpoint: "/trpc",
      req: req,
      router: appRouter,
      createContext,
    });
  },
  POST(req: Request, _ctx: HandlerContext) {
    return fetchRequestHandler({
      endpoint: "/trpc",
      req: req,
      router: appRouter,
      createContext,
    });
  },
};
