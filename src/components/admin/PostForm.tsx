"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

type Post = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  author: string | null;
  featuredImage: string | null;
  status: string;
  publishedAt: string;
};

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body = {
      slug: form.get("slug"),
      title: form.get("title"),
      excerpt: form.get("excerpt"),
      content: form.get("content"),
      category: form.get("category"),
      author: form.get("author"),
      featuredImage: form.get("featuredImage"),
      status: form.get("status"),
      publishedAt: form.get("publishedAt"),
    };

    const res = await fetch(post?.id ? `/api/posts/${post.id}` : "/api/posts", {
      method: post?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      setError("Could not save. Check the fields and try again.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" defaultValue={post?.title} required />
      </div>
      <div>
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={post?.slug} required />
      </div>
      <div>
        <label htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt ?? ""} />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" defaultValue={post?.content} required style={{ minHeight: 240 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={post?.category ?? ""} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input id="author" name="author" defaultValue={post?.author ?? ""} />
        </div>
      </div>
      <MediaUploadField
        name="featuredImage"
        label="Featured image"
        accept="image/*"
        kind="image"
        defaultValue={post?.featuredImage ?? ""}
      />
      <div>
        <label htmlFor="publishedAt">Published date</label>
        <input id="publishedAt" name="publishedAt" type="date" defaultValue={post?.publishedAt ?? new Date().toISOString().slice(0, 10)} />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={post?.status ?? "published"}>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      <div className="actions">
        <button className="admin-btn" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
