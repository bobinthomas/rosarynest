"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MediaListUploadField } from "@/components/admin/MediaListUploadField";
import { YouTubeVideoField } from "@/components/admin/YouTubeVideoField";
import { extractYouTubeId } from "@/lib/youtube";

type Cottage = {
  id?: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  capacitySummary: string | null;
  areaSqm: number | null;
  nightlyRate: number | null;
  amenities: string[];
  images: string[];
  videoYoutubeUrl: string | null;
  videoPosterUrl: string | null;
  videoCaption: string | null;
  displayOrder: number;
  status: string;
};

export function CottageForm({ cottage }: { cottage?: Cottage }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const videoYoutubeUrl = String(form.get("videoYoutubeUrl") ?? "").trim();
    if (videoYoutubeUrl && !extractYouTubeId(videoYoutubeUrl)) {
      setError("Enter a valid YouTube link (watch, youtu.be, or embed URL).");
      setSaving(false);
      return;
    }

    const body = {
      slug: form.get("slug"),
      name: form.get("name"),
      tagline: form.get("tagline"),
      description: form.get("description"),
      capacitySummary: form.get("capacitySummary"),
      areaSqm: Number(form.get("areaSqm")) || null,
      nightlyRate: Number(form.get("nightlyRate")) || null,
      amenities: String(form.get("amenities") ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
      images: String(form.get("images") ?? "").split("\n").map((s) => s.trim()).filter(Boolean),
      videoYoutubeUrl: videoYoutubeUrl || null,
      videoPosterUrl: form.get("videoPosterUrl") || null,
      videoCaption: form.get("videoCaption") || null,
      displayOrder: Number(form.get("displayOrder")) || 0,
      status: form.get("status"),
    };

    const res = await fetch(cottage?.id ? `/api/cottages/${cottage.id}` : "/api/cottages", {
      method: cottage?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/cottages");
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
          <label htmlFor="name">Name</label>
          <input id="name" name="name" defaultValue={cottage?.name} required />
        </div>
        <div>
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={cottage?.slug} required />
        </div>
      </div>
      <div>
        <label htmlFor="tagline">Tagline</label>
        <input id="tagline" name="tagline" defaultValue={cottage?.tagline ?? ""} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={cottage?.description} required style={{ minHeight: 160 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
        <div>
          <label htmlFor="capacitySummary">Capacity summary</label>
          <input id="capacitySummary" name="capacitySummary" defaultValue={cottage?.capacitySummary ?? ""} />
        </div>
        <div>
          <label htmlFor="areaSqm">Area (m²)</label>
          <input id="areaSqm" name="areaSqm" type="number" defaultValue={cottage?.areaSqm ?? ""} />
        </div>
        <div>
          <label htmlFor="nightlyRate">Nightly rate (₹, leave blank to hide)</label>
          <input id="nightlyRate" name="nightlyRate" type="number" min="0" defaultValue={cottage?.nightlyRate ?? ""} />
        </div>
        <div>
          <label htmlFor="displayOrder">Display order</label>
          <input id="displayOrder" name="displayOrder" type="number" defaultValue={cottage?.displayOrder ?? 0} />
        </div>
      </div>
      <div>
        <label htmlFor="amenities">Amenities (one per line)</label>
        <textarea id="amenities" name="amenities" defaultValue={cottage?.amenities?.join("\n")} style={{ minHeight: 120 }} />
      </div>
      <MediaListUploadField name="images" label="Images (one per line)" defaultValue={cottage?.images?.join("\n")} />
      <YouTubeVideoField
        urlName="videoYoutubeUrl"
        posterName="videoPosterUrl"
        captionName="videoCaption"
        label="Video (YouTube link)"
        defaultUrl={cottage?.videoYoutubeUrl ?? ""}
        defaultPoster={cottage?.videoPosterUrl ?? ""}
        defaultCaption={cottage?.videoCaption ?? ""}
      />
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={cottage?.status ?? "published"}>
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
