"use client";

import { useId, useState } from "react";

export function MediaListUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
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
      setValue((prev) => (prev.trim() ? `${prev.replace(/\n+$/, "")}\n${data.url}` : data.url));
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label htmlFor={inputId} style={{ marginBottom: 0 }}>{label}</label>
        <label className="admin-btn secondary" style={{ cursor: "pointer", fontSize: 12, padding: "6px 12px" }}>
          {uploading ? "Uploading…" : "Upload image"}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </label>
      </div>
      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ minHeight: 100, marginTop: 6 }}
      />
      {error ? <p className="admin-error">{error}</p> : null}
    </div>
  );
}
