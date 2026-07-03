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
    "Scarlet Hut, an elevated wooden cottage on stilts reached by a staircase, set among tall forest trees",
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
