import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { getGalleryItems } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Gallery — RosaryNest",
  description:
    "A walk through RosaryNest in pictures — the land, the cottages, the food, and the seasons, photographed over a year in available light.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <>
      <PageHero
        kicker="Gallery"
        title="A walk through Rosary Nest,"
        emphasis="in pictures."
        subhead="Photographed over a year by our cousin Maya, who works mostly in available light, and waits."
      />
      <GalleryGrid items={items} />
    </>
  );
}
