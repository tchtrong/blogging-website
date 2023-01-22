import PostDetail from "@/components/PostDetail.tsx";
import { trpcClient } from "@/trpc/client.ts";
import { ROUTES, styles } from "@/utils/constants.ts";
import type { MyPost } from "@/utils/posts/types.ts";
import { signal } from "@preact/signals";
import { Fragment, JSX } from "preact";
import { useEffect } from "preact/hooks";

export type PostFormProps =
  | {
      type: "EDIT";
      slug: string;
      rawPost: string;
      renderedPostContent: string;
    }
  | {
      type: "CREATE";
      slug: undefined;
      rawPost: "";
      renderedPostContent: "";
    };

const rawPostSignal = signal("");

const post = signal<MyPost>({
  content: "",
  publishedAt: new Date(),
  slug: "",
  title: "",
});

const renderedPostContent = signal("");

export default function PostForm({ type, slug, rawPost }: PostFormProps) {
  const onSubmit: JSX.HTMLAttributes<HTMLFormElement>["onSubmit"] = async (
    e
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (type === "EDIT") {
      await trpcClient.post.editPost.mutate({
        slug,
        newContent: String(formData.get("edit-post-content")),
      });
    } else if (type === "CREATE") {
      await trpcClient.post.createPost.mutate({
        rawPost: String(formData.get("edit-post-content")),
      });
    }
    window.location.href = ROUTES.HOME();
  };

  const onClickPreview: JSX.HTMLAttributes<HTMLButtonElement>["onClick"] =
    async () => {
      post.value = await trpcClient.post.transformToPost.query({
        rawPost: rawPostSignal.value,
      });
      renderedPostContent.value = await trpcClient.post.renderPostContent.query(
        post.value.content
      );
    };

  useEffect(() => {
    rawPostSignal.value = rawPost;
    (async () => {
      post.value = await trpcClient.post.transformToPost.query({
        rawPost: rawPostSignal.value,
      });
      renderedPostContent.value = await trpcClient.post.renderPostContent.query(
        post.value.content
      );
    })();
  }, []);

  return (
    <Fragment>
      <button type="button" onClick={onClickPreview} class={styles.buttonMain}>
        Preview
      </button>
      <div className="grid grid-cols-2 gap-12 max-w-screen-xl mx-auto p-4">
        <form class="" method="post" onSubmit={onSubmit}>
          <button class={styles.buttonMain} type="submit">
            Save
          </button>
          <br />
          <label
            class="block mb-2 text-sm font-medium text-gray-900"
            for="edit-post-content"
          >{`${type === "CREATE" ? "Write" : "Edit"} your blog:`}</label>
          <textarea
            class="block
            p-2.5
            w-full h-[80vh]
            text-sm text-gray-900
            bg-gray-50
            rounded-lg border border-gray-300
            focus:ring-blue-500 focus:border-blue-500"
            id="edit-post-content"
            name="edit-post-content"
            value={rawPostSignal.value}
            onInput={(e) => {
              rawPostSignal.value = e.currentTarget.value;
            }}
          />
        </form>
        <div class="h-[90vh] overflow-y-auto overflow-x-hidden">
          <PostDetail
            post={post.value}
            renderedPostContent={renderedPostContent.value}
          />
        </div>
      </div>
    </Fragment>
  );
}
