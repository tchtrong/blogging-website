import { Handlers, PageProps } from "$fresh/server.ts";
import PostDetail from "@/components/PostDetail.tsx";
import { trpcServer } from "@/trpc/server.ts";
import { styles } from "@/utils/constants.ts";
import { POST_ROUTES } from "@/utils/posts/constants.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const post = await trpcServer.post.getPost(ctx.params.slug);
    const renderedPostContent = await trpcServer.post.renderPostContent(
      post.content
    );
    return ctx.render({ ...ctx.state, post, renderedPostContent });
  },
};

export default function Post(props: PageProps) {
  const { post, renderedPostContent } = props.data;
  return post ? (
    <div class="px-4 mx-auto max-w-screen-md">
      <a href={POST_ROUTES.EDIT(post.slug)} class={styles.buttonMain}>
        Edit
      </a>
      <PostDetail post={post} renderedPostContent={renderedPostContent} />
    </div>
  ) : (
    <></>
  );
}
