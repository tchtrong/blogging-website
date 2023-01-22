import { Context } from "@/trpc/fetch-context.ts";
import { CombinedDataTransformer, initTRPC } from "@trpc/server";
import * as devalue from "devalue";
import superjson from "superjson";

export const transformer: CombinedDataTransformer = {
  input: superjson,
  output: {
    deserialize: (object: unknown): unknown => eval(`(${object})`),
    serialize: devalue.uneval,
  },
};

const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const middleware = trpc.middleware;
export const router = trpc.router;
export const publicProcedure = trpc.procedure;
