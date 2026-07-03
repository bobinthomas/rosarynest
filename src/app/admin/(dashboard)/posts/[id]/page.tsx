import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { PostForm } from "@/components/admin/PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const rows = await db.select().from(posts).where(eq(posts.id, Number(id))).limit(1);
  if (!rows[0]) notFound();

  return (
    <>
      <h1>Edit Post</h1>
      <p className="sub">{rows[0].title}</p>
      <PostForm post={rows[0]} />
    </>
  );
}
