import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { StructuredData } from "@/components/StructuredData";
import { getGalleryItems } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Gallery — RosaryNest",
  description:
    "A walk through RosaryNest in pictures — the land, the cottages, the food, and the seasons, photographed over a year in available light.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGalleryItems();

  const galleryImages = items.map((item) => ({
    "@type": "ImageObject",
    contentUrl: `${SITE_URL}${item.imageUrl}`,
    name: item.caption,
    caption: item.caption,
  }));

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gallery — RosaryNest",
    url: `${SITE_URL}/gallery`,
    mainEntity: { "@type": "ImageGallery", image: galleryImages },
  };

  return (
    <>
      <StructuredData data={collectionPage} />
      <PageHero
        kicker="Gallery"
        title="A walk through RosaryNest,"
        emphasis="in pictures."
        subhead="Photographed over a year by the family, who work mostly in available light, and wait."
      />
      <GalleryGrid items={items} />
    </>
  );
}
