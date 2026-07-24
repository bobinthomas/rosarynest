"use client";

import { useState, FormEvent } from "react";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

const textFields: { key: string; label: string }[] = [
  { key: "site_name", label: "Site name" },
  { key: "tagline", label: "Tagline" },
  { key: "established_year", label: "Established year" },
  { key: "booking_url", label: "Booking URL (third-party booking system)" },
  { key: "phone", label: "Phone" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "email", label: "Email" },
  { key: "address_line1", label: "Address line 1" },
  { key: "address_line2", label: "Address line 2" },
  { key: "latitude", label: "Latitude" },
  { key: "longitude", label: "Longitude" },
  { key: "instagram_url", label: "Instagram URL" },
  { key: "facebook_url", label: "Facebook URL" },
  { key: "tripadvisor_url", label: "TripAdvisor URL" },
  { key: "hours_note", label: "Contact hours note" },
];

const allKeys = [
  "logo_url",
  "hero_media_type",
  "hero_image_url",
  "hero_video_url",
  ...textFields.map((f) => f.key),
];

export function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heroMediaType, setHeroMediaType] = useState(settings.hero_media_type || "video");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const form = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    for (const key of allKeys) {
      body[key] = String(form.get(key) ?? "");
    }

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    if (res.ok) setSaved(true);
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h3 style={{ margin: "0 0 -8px", fontFamily: "var(--serif)", color: "var(--forest)" }}>Branding</h3>

      <MediaUploadField
        name="logo_url"
        label="Logo"
        accept="image/*"
        kind="image"
        defaultValue={settings.logo_url || "/images/RosaryNest-animated1.svg"}
      />

      <h3 style={{ margin: "12px 0 -8px", fontFamily: "var(--serif)", color: "var(--forest)" }}>Homepage hero</h3>

      <div>
        <label htmlFor="hero_media_type">Hero shows</label>
        <select
          id="hero_media_type"
          name="hero_media_type"
          value={heroMediaType}
          onChange={(e) => setHeroMediaType(e.target.value)}
        >
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
      </div>

      {heroMediaType === "video" ? (
        <MediaUploadField
          key="hero_video_url"
          name="hero_video_url"
          label="Hero video"
          accept="video/*"
          kind="video"
          defaultValue={settings.hero_video_url || "/video/Hero-new.mp4"}
        />
      ) : (
        <MediaUploadField
          key="hero_image_url"
          name="hero_image_url"
          label="Hero image"
          accept="image/*"
          kind="image"
          defaultValue={settings.hero_image_url || ""}
        />
      )}
      {/* Keep whichever field isn't currently selected in the DOM (hidden) so its
          value round-trips even while the other media type is being edited. */}
      <input type="hidden" name={heroMediaType === "video" ? "hero_image_url" : "hero_video_url"}
        defaultValue={heroMediaType === "video" ? settings.hero_image_url ?? "" : settings.hero_video_url ?? ""} />

      <h3 style={{ margin: "12px 0 -8px", fontFamily: "var(--serif)", color: "var(--forest)" }}>Contact & details</h3>

      {textFields.map((field) => (
        <div key={field.key}>
          <label htmlFor={field.key}>{field.label}</label>
          <input id={field.key} name={field.key} defaultValue={settings[field.key] ?? ""} />
        </div>
      ))}
      <div className="actions">
        <button className="admin-btn" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
        </button>
        {saved ? <span style={{ alignSelf: "center", color: "var(--forest)" }}>Saved.</span> : null}
      </div>
    </form>
  );
}
