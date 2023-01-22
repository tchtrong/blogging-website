import { Handlers, PageProps } from "$fresh/server.ts";
import { PostPreview } from "@/components/PostPreview.tsx";
import { styles } from "@/utils/constants.ts";
import { POST_ROUTES } from "@/utils/posts/constants.ts";
import { getPostList } from "@/utils/posts/postCRUD.ts";
import type { MyPost } from "@/utils/posts/types.ts";

export const handler: Handlers = {
  GET: async (_req, ctx) => {
    const posts = await getPostList();
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<MyPost[]>) {
  const { data: posts } = props;
  return (
    <>
      <header class="bg-yellow-200 relative min-h-[30vh]">
        <h1 class="text-4xl lg:text-8xl font-bold absolute bottom-6 flex items-center">
          Welcome to BinMin's Blog
        </h1>
      </header>
      <div class="p-4 mx-auto max-w-screen-md">
        <main>
          <a href={POST_ROUTES.CREATE()} class={styles.buttonMain}>
            Write a new post
          </a>
          <ul class="mt-20">
            {posts.map((post) => (
              <li class="border-t">
                <PostPreview key={post.slug} post={post} />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
