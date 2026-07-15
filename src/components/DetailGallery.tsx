"use client";

import { useState } from "react";
import { SiteImage } from "@/components/SiteImage";
import { Lightbox } from "@/components/Lightbox";

const gridPositions = ["g1", "g2", "g3", "g4"];

/**
 * Room/experience photo grid used below a detail page's hero — skips the
 * hero's own image (images[0]) and shows up to four more. Click any tile to
 * open a full-screen viewer with prev/next; the grid itself already carries
 * the site's zoom-in cursor styling (.gallery .img), which had no click
 * handler behind it until this component.
 */
export function DetailGallery({ images, title }: { images: string[]; title: string }) {
  const thumbs = images.slice(1, 5);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (thumbs.length === 0) return null;

  return (
    <>
      <div className="gallery" data-reveal-group>
        {thumbs.map((img, i) => (
          <div className={gridPositions[i] ?? "g4"} key={img}>
            <div
              className="img"
              data-reveal="image"
              style={{ "--reveal-i": i } as React.CSSProperties}
              role="button"
              tabIndex={0}
              aria-label={`Open photo ${i + 2} of ${title}`}
              onClick={() => setOpenIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setOpenIndex(i);
              }}
            >
              <SiteImage src={img} alt={`${title} — view ${i + 2}`} sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={thumbs.map((img, i) => ({ src: img, alt: `${title} — view ${i + 2}` }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
