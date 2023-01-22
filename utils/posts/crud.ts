import { transformToPost } from "@/utils/posts/helpers.ts";
import type { MyPost } from "@/utils/posts/types.ts";

export async function getPostRaw(slug: string) {
  const text = await Deno.readTextFile(
    `./data/posts/${decodeURIComponent(slug)}.md`,
  );
  return text;
}

export async function getPost(
  slug: string,
): Promise<MyPost> {
  const rawPost = await getPostRaw(slug);
  return transformToPost(rawPost, slug);
}

export async function getPostRawList() {
  const promises: Promise<string>[] = [];
  const slugs: string[] = [];
  for await (const entry of Deno.readDir("./data/posts")) {
    const slug = entry.name.replace(".md", "");
    promises.push(getPostRaw(slug));
    slugs.push(slug);
  }
  const rawPosts = await Promise.all(promises);
  return { slugs, rawPosts };
}

export async function getPostList(): Promise<MyPost[]> {
  const { slugs, rawPosts } = await getPostRawList();
  const posts = rawPosts.map((rawPost, idx) =>
    transformToPost(rawPost, slugs[idx])
  );
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

export async function editPost(
  slug: string,
  newContent: string,
): Promise<void> {
  await Deno.writeTextFile(
    `./data/posts/${decodeURIComponent(slug)}.md`,
    newContent,
  );
}

export async function createPost(
  newContent: string,
): Promise<void> {
  const post = transformToPost(newContent);
  post.title = post.title.trim();
  const decodedSlug = post.title.toLowerCase().replaceAll(" ", "-");
  post.slug = encodeURIComponent(decodedSlug);
  await Deno.writeTextFile(
    `./data/posts/${decodedSlug}.md`,
    newContent,
  );
}
