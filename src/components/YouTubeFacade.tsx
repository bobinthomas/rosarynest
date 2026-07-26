"use client";

import { useState } from "react";
import { SiteImage } from "@/components/SiteImage";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";

/**
 * Lightweight click-to-load YouTube embed: renders a poster image until
 * clicked, then swaps in the real iframe — avoids loading YouTube's player
 * for every visitor on every page load.
 */
export function YouTubeFacade({
  videoId,
  posterUrl,
  caption,
  title,
}: {
  videoId: string;
  posterUrl?: string | null;
  caption?: string | null;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const poster = posterUrl || getYouTubeThumbnailUrl(videoId);

  return (
    <figure className="yt-video" data-reveal="image">
      <div className="yt-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="yt-poster" aria-label={`Play video: ${title}`} onClick={() => setPlaying(true)}>
            <SiteImage src={poster} alt="" sizes="(max-width: 1024px) 100vw, 1280px" />
            <span className="yt-play">
              <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M1 1 L21 13 L1 25 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {caption ? <figcaption className="yt-caption">{caption}</figcaption> : null}
    </figure>
  );
}
