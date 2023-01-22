import { Handlers, PageProps } from "$fresh/server.ts";
import PostForm from "@/islands/PostForm.tsx";
import { trpcServer } from "@/trpc/server.ts";
import { Fragment } from "preact";

interface Data {
  rawPost: string;
  renderedPostContent: string;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { rawPost, renderedPostContent } =
      await trpcServer.post.getPostRawAndRenderedContent(ctx.params.slug);
    return ctx.render({ rawPost, renderedPostContent });
  },
};

export default function PostEdit(props: PageProps<Data>) {
  const { rawPost, renderedPostContent } = props.data;
  return rawPost && renderedPostContent ? (
    <Fragment>
      <PostForm
        type="EDIT"
        slug={props.params.slug}
        rawPost={rawPost}
        renderedPostContent={renderedPostContent}
      />
    </Fragment>
  ) : (
    <></>
  );
}
