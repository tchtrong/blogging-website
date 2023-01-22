import { router } from "@/trpc/trpc.ts";
import { postRouter } from "@/utils/posts/postTRPC.ts";

// This export is needed for integrating tRPC with Fresh in `/routes/trpc`
// It is only used on the server!
export const appRouter = router({
  post: postRouter,
});

// This export only export the *type signature* of the trpc router!
// This avoids accidentally importing the full Router into client-side code
export type AppRouter = typeof appRouter;
