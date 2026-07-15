"use client";

import { useEffect } from "react";
import { SiteImage } from "@/components/SiteImage";

export type LightboxImage = { src: string; alt: string; caption?: string | null };

/**
 * Full-screen photo viewer. Renders against .lightbox/.lb-* — CSS that
 * already existed for this (built for the /gallery masonry page) but had
 * never been wired to an actual open/close/navigate implementation anywhere
 * on the site.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;

    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate(((index as number) - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, images.length, onClose, onNavigate]);

  if (index === null) return null;
  const current = images[index];

  return (
    <div className="lightbox is-open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="lb-count">
        {index + 1} / {images.length}
      </div>
      <button className="lb-close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      {images.length > 1 ? (
        <button
          className="lb-arrow lb-prev"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index - 1 + images.length) % images.length);
          }}
        >
          &lsaquo;
        </button>
      ) : null}
      <div className="lb-frame" onClick={(e) => e.stopPropagation()}>
        <div className="lb-img">
          <SiteImage src={current.src} alt={current.alt} />
        </div>
        {current.caption ? <div className="lb-cap">{current.caption}</div> : null}
      </div>
      {images.length > 1 ? (
        <button
          className="lb-arrow lb-next"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((index + 1) % images.length);
          }}
        >
          &rsaquo;
        </button>
      ) : null}
    </div>
  );
}
