// Descriptive alt text for the images used as each cottage/experience's
// primary photo (cards, heroes, thumbnails) — written from actually looking
// at the photos, not derived from filenames or reusing the entity name.
// Falls back to the provided default for any image not listed here (e.g.
// gallery/detail shots, or future admin-uploaded photos).
const descriptions: Record<string, string> = {
  "/images/red-cottage-front-view.png":
    "Tarry Cottage's red-painted exterior with a pitched green roof, lit warmly at dusk among tall forest trees",
  "/images/veranta-view-3.jpg":
    "Sparrow Hut's private balcony with a small table and two woven chairs, overlooking misty forest canopy",
  "/images/hut-main-view-1.jpg":
    "Sparrow Hut, an elevated wooden cottage on stilts reached by a staircase, set among tall forest trees",
  "/images/cottage-front-view1.jpg":
    "Eyrie Cottage's whitewashed veranda with folding chairs, framed by bamboo and morning mist",
  "/images/bonfirre-stargazing.png":
    "A crackling bonfire surrounded by chairs at dusk, with misty hills silhouetted against an orange sunset sky",
  "/images/nest-breakfast.png":
    "A Kerala breakfast spread of appam, curry, fresh juice, and bananas on an outdoor table by a bamboo grove",
  "/images/dam-sengulam-munnar.png":
    "Aerial view of a lake and small dam bridge surrounded by misty forest and tea plantations",
  "/images/forest-trail.png": "A lantern-lit stone pathway winding through misty forest at dusk",
};

export function getAltText(src: string, fallback: string): string {
  return descriptions[src] ?? fallback;
}

// Fallback for gallery/detail-view images that aren't in the hand-written
// `descriptions` map above (mostly secondary photos on cottage/experience
// pages). Filenames on this site are reliably descriptive (e.g.
// "red-cottage-bed2view-1.jpg", "hut-washroom-1.jpg"), so matching a few
// known area/room keywords gives real specificity ("Den View Cottage,
// bathroom") instead of a meaningless "— view 3" — without needing a
// caption field in the schema or having to hand-write an entry per photo.
const AREA_KEYWORDS: [RegExp, string][] = [
  [/front-view|main-view/i, "exterior view"],
  [/entrance/i, "entrance"],
  [/bed\d?[- ]?view|bedroom|bed-\d/i, "bedroom"],
  [/dining/i, "dining area"],
  [/bath|washroom/i, "bathroom"],
  [/hall/i, "hall"],
  [/veranta|veranda/i, "veranda"],
  [/garden-view-wide|garden-view/i, "garden view"],
  [/bamboo-cafe/i, "bamboo café"],
  [/path-view/i, "the path to the cottage"],
];

export function getGalleryAltText(src: string, title: string, index: number): string {
  if (descriptions[src]) return descriptions[src];
  const match = AREA_KEYWORDS.find(([pattern]) => pattern.test(src));
  return match ? `${title}, ${match[1]}` : `${title} — view ${index}`;
}
