"use client";

import { useId, useState } from "react";

export function MediaUploadField({
  name,
  label,
  defaultValue,
  accept,
  kind = "image",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  accept: string;
  kind?: "image" | "video";
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputId = useId();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = (await res.json()) as { url: string };
      setValue(data.url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          id={inputId}
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={kind === "video" ? "/video/example.mp4" : "/images/example.jpg"}
        />
        <label
          className="admin-btn secondary"
          style={{ cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}
        >
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept={accept} onChange={handleFile} style={{ display: "none" }} />
        </label>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
      {value ? (
        kind === "video" ? (
          <video src={value} controls style={{ maxWidth: 280, marginTop: 10, display: "block" }} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" style={{ maxWidth: 200, marginTop: 10, display: "block" }} />
        )
      ) : null}
    </div>
  );
}
