import { PostForm } from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <>
      <h1>New Post</h1>
      <p className="sub">Write a new journal entry.</p>
      <PostForm />
    </>
  );
}
