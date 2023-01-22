import { Handlers, PageProps } from "$fresh/server.ts";
import PostDetail from "@/components/PostDetail.tsx";
import { styles } from "@/utils/constants.ts";
import { POST_ROUTES } from "@/utils/posts/constants.ts";
import { getPost } from "@/utils/posts/postCRUD.ts";
import { renderPostContent } from "@/utils/posts/postHelpers.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    const renderedPostContent = renderPostContent(post.content);
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
