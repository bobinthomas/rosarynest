"use client";

import { useId, useState } from "react";
import { MediaUploadField } from "@/components/admin/MediaUploadField";
import { extractYouTubeId, getYouTubeThumbnailUrl } from "@/lib/youtube";

export function YouTubeVideoField({
  urlName,
  posterName,
  captionName,
  label,
  defaultUrl,
  defaultPoster,
  defaultCaption,
}: {
  urlName: string;
  posterName: string;
  captionName: string;
  label: string;
  defaultUrl?: string;
  defaultPoster?: string;
  defaultCaption?: string;
}) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [error, setError] = useState("");
  const inputId = useId();

  const videoId = extractYouTubeId(url);

  function handleBlur() {
    setError(url.trim() && !videoId ? "Enter a valid YouTube link (watch, youtu.be, or embed URL)." : "");
  }

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="text"
        name={urlName}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          if (error) setError("");
        }}
        onBlur={handleBlur}
        placeholder="https://www.youtube.com/watch?v=..."
      />
      {error ? <p className="admin-error">{error}</p> : null}
      {videoId ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getYouTubeThumbnailUrl(videoId)}
          alt=""
          style={{ maxWidth: 200, marginTop: 10, display: "block" }}
        />
      ) : null}
      <MediaUploadField
        name={posterName}
        label="Custom poster (optional — falls back to the YouTube thumbnail)"
        accept="image/*"
        kind="image"
        defaultValue={defaultPoster}
      />
      <div>
        <label htmlFor={`${inputId}-caption`}>Caption (optional)</label>
        <input id={`${inputId}-caption`} name={captionName} defaultValue={defaultCaption ?? ""} />
      </div>
    </div>
  );
}
