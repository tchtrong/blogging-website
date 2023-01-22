export const POST_ROUTES = {
  CREATE: () => "/posts/create" as const,
  READ: (slug: string) => `/posts/${slug}` as const,
  EDIT: (slug: string) => `/posts/${slug}/edit` as const,
} as const;
