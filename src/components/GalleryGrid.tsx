"use client";

import { useState } from "react";
import { SiteImage } from "@/components/SiteImage";

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
  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <nav className="filter-row" data-reveal="fade">
        {categories.map((c) => (
          <a
            key={c.key}
            className={filter === c.key ? "is-active" : ""}
            onClick={() => setFilter(c.key)}
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
            <div className="img" data-reveal="image">
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
    </>
  );
}
