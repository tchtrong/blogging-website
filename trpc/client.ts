import { IS_BROWSER } from "$fresh/runtime.ts";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "./server.ts";

/**
 * This guard check for IS_BROWSER is necessary,
 * since `location` is not defined in global scope on server and crashes on deno deploy.
 */
const host = (() => {
  if (IS_BROWSER) {
    return globalThis.location.origin;
  } else return "";
})();

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${host}/trpc`,
    }),
  ],
  transformer: superjson,
});
