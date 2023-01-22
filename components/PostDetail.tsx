import type { MyPost } from "@/utils/posts/types.ts";
import { Fragment } from "preact";

export interface PostDetailProps {
  post: MyPost;
  renderedPostContent: string;
}

export default function PostDetail(props: PostDetailProps) {
  const { post, renderedPostContent } = props;
  return (
    <Fragment>
      <h1 class="font-bold text-5xl">{post.title}</h1>
      <time class="inline-block mt-4">
        {new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <article
        class="mt-12"
        dangerouslySetInnerHTML={{ __html: renderedPostContent }}
      />
    </Fragment>
  );
}
