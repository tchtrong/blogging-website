import { z } from "zod";

export const MyPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  publishedAt: z.date({
    coerce: false,
  }),
  content: z.string(),
});

export type MyPost = z.infer<typeof MyPostSchema>;
