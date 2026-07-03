import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import imageManifest from "@/lib/image-manifest.json";

const manifest = imageManifest as Record<string, { width: number; height: number; webp: string }>;

const DEFAULT_SHARE_IMAGE = "/images/red-cottage-front-view.png";
const SITE_NAME = "RosaryNest";

/**
 * Builds a consistent Metadata object — title, description, canonical, and
 * matching Open Graph + Twitter Card fields — so every page gets full social
 * share support without repeating the same boilerplate. `path` is the page's
 * route (e.g. "/cottages"), used for both the canonical tag and the OG url.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_SHARE_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const entry = manifest[image];
  const shareImage = entry?.webp ?? image;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: entry
        ? [{ url: shareImage, width: entry.width, height: entry.height, alt: title }]
        : [{ url: shareImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export { SITE_URL };
