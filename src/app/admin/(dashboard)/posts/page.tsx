import Link from "next/link";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminPostsPage() {
  const db = await getDb();
  const rows = await db.select().from(posts).orderBy(desc(posts.publishedAt));

  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Journal Posts</h1>
          <p className="sub">{rows.length} post{rows.length === 1 ? "" : "s"}</p>
        </div>
        <Link className="admin-btn" href="/admin/posts/new">
          New Post
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Published</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td>{post.publishedAt}</td>
              <td>{post.status}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <Link className="admin-btn secondary" href={`/admin/posts/${post.id}`}>
                  Edit
                </Link>
                <DeleteButton resource="posts" id={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
