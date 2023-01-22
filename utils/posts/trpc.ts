import { publicProcedure, router } from "@/trpc/trpc.ts";
import {
  createPost,
  editPost,
  getPost,
  getPostList,
  getPostRaw,
  getPostRawList,
} from "@/utils/posts/crud.ts";
import {
  renderPostContent,
  renderPostRawContent,
  transformToPost,
} from "@/utils/posts/helpers.ts";
import { MyPostSchema } from "@/utils/posts/types.ts";
import { z } from "zod";

export const postRouter = router({
  getPost: publicProcedure
    .input(z.string())
    .output(MyPostSchema)
    .query(async (req) => {
      return await getPost(req.input);
    }),
  getPostRaw: publicProcedure
    .input(z.string())
    .output(z.string())
    .query(async (req) => {
      return await getPostRaw(req.input);
    }),
  getPostList: publicProcedure
    .query(async () => {
      return await getPostList();
    }),
  getPostRawList: publicProcedure
    .query(async () => {
      return await getPostRawList();
    }),
  getPostRawAndRenderedContent: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const rawPost = await getPostRaw(input);
      const renderedPostContent = renderPostRawContent(rawPost, input);
      return { rawPost, renderedPostContent };
    }),
  editPost: publicProcedure
    .input(z.object({
      slug: z.string(),
      newContent: z.string(),
    }))
    .mutation(({ input: { newContent, slug } }) => {
      return editPost(slug, newContent);
    }),
  createPost: publicProcedure
    .input(z.object({
      rawPost: z.string(),
    }))
    .mutation(({ input: { rawPost } }) => {
      return createPost(rawPost);
    }),
  transformToPost: publicProcedure
    .input(z.object({
      rawPost: z.string(),
      slug: z.string().optional(),
    }))
    .output(MyPostSchema)
    .query(({ input }) => {
      return transformToPost(input.rawPost, input.slug);
    }),
  renderPostContent: publicProcedure
    .input(z.string())
    .output(z.string())
    .query(
      ({ input }) => {
        return renderPostContent(input);
      },
    ),
});
