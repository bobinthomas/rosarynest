"use client";

import { useState } from "react";
import { SiteImage } from "@/components/SiteImage";
import { Lightbox } from "@/components/Lightbox";

type GalleryItem = {
  id: number;
  imageUrl: string;
  caption: string | null;
  category: string;
};

const categories = [
  { key: "all", label: "Everything" },
  { key: "land", label: "The Land" },
  { key: "cottages", label: "The Cottages" },
  { key: "food", label: "The Food" },
  { key: "seasons", label: "The Seasons" },
];

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <nav className="filter-row" data-reveal="fade">
        {categories.map((c) => (
          <a
            key={c.key}
            className={filter === c.key ? "is-active" : ""}
            onClick={() => {
              setFilter(c.key);
              setOpenIndex(null);
            }}
            style={{ cursor: "pointer" }}
          >
            {c.label}
          </a>
        ))}
        <span className="count">{items.length} photographs · 2025—2026</span>
      </nav>

      <section className="masonry" data-reveal-group>
        {visible.map((item, i) => (
          <div className="tile" key={item.id} style={{ "--reveal-i": i % 6 } as React.CSSProperties}>
            <div
              className="img"
              data-reveal="image"
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${item.caption ?? "untitled"}`}
              onClick={() => setOpenIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setOpenIndex(i);
              }}
            >
              <SiteImage
                src={item.imageUrl}
                alt={item.caption ?? ""}
                priority={i < 3}
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
            {item.caption ? <div className="cap">{item.caption}</div> : null}
          </div>
        ))}
      </section>

      <Lightbox
        images={visible.map((item) => ({ src: item.imageUrl, alt: item.caption ?? "", caption: item.caption }))}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
