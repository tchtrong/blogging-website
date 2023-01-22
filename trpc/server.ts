import { router } from "@/trpc/trpc.ts";
import { postRouter } from "@/utils/posts/trpc.ts";

// This export is needed for integrating tRPC with Fresh in `/routes/trpc`
// It is only used on the server!
export const appRouter = router({
  post: postRouter,
});

export const trpcServer = appRouter.createCaller({
  req: new Request("http://localhost:8000"),
});

// This export only export the *type signature* of the trpc router!
// This avoids accidentally importing the full Router into client-side code
export type AppRouter = typeof appRouter;
