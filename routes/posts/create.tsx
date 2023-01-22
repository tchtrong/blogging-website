import PostForm from "@/islands/PostForm.tsx";

export default function PostCreate() {
  return (
    <>
      <PostForm
        type="CREATE"
        slug={undefined}
        rawPost=""
        renderedPostContent=""
      />
    </>
  );
}
