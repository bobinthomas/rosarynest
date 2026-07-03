"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MediaListUploadField } from "@/components/admin/MediaListUploadField";

type Experience = {
  id?: number;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  duration: string | null;
  cost: string | null;
  included: string[];
  images: string[];
  displayOrder: number;
  status: string;
};

export function ExperienceForm({ experience }: { experience?: Experience }) {
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
      summary: form.get("summary"),
      content: form.get("content"),
      duration: form.get("duration"),
      cost: form.get("cost"),
      included: String(form.get("included") ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
      images: String(form.get("images") ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
      displayOrder: Number(form.get("displayOrder")) || 0,
      status: form.get("status"),
    };

    const res = await fetch(experience?.id ? `/api/experiences/${experience.id}` : "/api/experiences", {
      method: experience?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/experiences");
      router.refresh();
    } else {
      setError("Could not save. Check the fields and try again.");
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" defaultValue={experience?.title} required />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={experience?.slug} required />
        </div>
      </div>
      <div>
        <label htmlFor="summary">Summary</label>
        <input id="summary" name="summary" defaultValue={experience?.summary ?? ""} />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" defaultValue={experience?.content} required style={{ minHeight: 160 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div>
          <label htmlFor="duration">Duration</label>
          <input id="duration" name="duration" defaultValue={experience?.duration ?? ""} />
        </div>
        <div>
          <label htmlFor="cost">Cost</label>
          <input id="cost" name="cost" defaultValue={experience?.cost ?? ""} />
        </div>
        <div>
          <label htmlFor="displayOrder">Display order</label>
          <input id="displayOrder" name="displayOrder" type="number" defaultValue={experience?.displayOrder ?? 0} />
        </div>
      </div>
      <div>
        <label htmlFor="included">What&#39;s included (one per line)</label>
        <textarea id="included" name="included" defaultValue={experience?.included?.join("\n")} style={{ minHeight: 120 }} />
      </div>
      <MediaListUploadField name="images" label="Images (one per line)" defaultValue={experience?.images?.join("\n")} />
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={experience?.status ?? "published"}>
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
