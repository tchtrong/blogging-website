import type { MyPost } from "../utils/posts/types.ts";

export interface PostPreviewProps {
  post: MyPost;
}

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <a href={`/posts/${post.slug}`} class="py-12 group grid sm:grid-cols-3">
      <time>
        {new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <div class="sm:col-span-2">
        <h2 class="text-2xl font-bold group-hover:underline">{post.title}</h2>
      </div>
    </a>
  );
}
