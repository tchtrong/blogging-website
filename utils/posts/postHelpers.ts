import * as gfm from "$gfm";
import { extract } from "$std/encoding/front_matter.ts";
import type { MyPost } from "@/utils/posts/types.ts";

export const transformToPost = (rawPost: string, slug?: string): MyPost => {
  const { attrs, body } = extract(rawPost);
  const params = attrs as Record<string, string>;
  const publishedAt = new Date(params.published_at);
  return {
    slug: slug ?? "",
    title: params.title,
    publishedAt,
    content: body,
  };
};

export const transformToPostRaw = (_post: MyPost): string => {
  throw new Error("NOT DEFINED");
};

export const renderPostContent = (postContent: string): string => {
  return `<style>${gfm.CSS}</style><div class="markdown-body">${
    gfm.render(postContent)
  }</div>`;
};

export const renderPostRawContent = (rawPost: string, slug?: string) => {
  return renderPostContent(transformToPost(rawPost, slug).content);
};
