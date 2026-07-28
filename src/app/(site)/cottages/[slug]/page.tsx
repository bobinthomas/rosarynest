import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteImage } from "@/components/SiteImage";
import { DetailGallery } from "@/components/DetailGallery";
import { YouTubeFacade } from "@/components/YouTubeFacade";
import { StructuredData } from "@/components/StructuredData";
import { getCottageBySlug, getCottages, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { getAltText } from "@/lib/image-alt";
import { extractYouTubeId } from "@/lib/youtube";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cottage = await getCottageBySlug(slug);
  if (!cottage) return {};

  return buildMetadata({
    title: `${cottage.name} — RosaryNest`,
    description: `${cottage.tagline} ${cottage.capacitySummary} — one of four cottages at RosaryNest in Munnar.`,
    path: `/cottages/${cottage.slug}`,
    image: cottage.images[0],
  });
}

export default async function CottageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cottage, allCottages, settings] = await Promise.all([
    getCottageBySlug(slug),
    getCottages(),
    getSettings(),
  ]);

  if (!cottage) notFound();

  const others = allCottages.filter((c) => c.slug !== slug).slice(0, 3);
  const videoId = cottage.videoYoutubeUrl ? extractYouTubeId(cottage.videoYoutubeUrl) : null;
  const bookingUrl = settings.booking_url || `/book?cottage=${cottage.slug}`;
  const bookingProps = settings.booking_url
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Cottages", item: `${SITE_URL}/cottages` },
      { "@type": "ListItem", position: 2, name: cottage.name, item: `${SITE_URL}/cottages/${cottage.slug}` },
    ],
  };

  const accommodation = cottage.nightlyRate
    ? {
        "@context": "https://schema.org",
        "@type": "Accommodation",
        name: cottage.name,
        url: `${SITE_URL}/cottages/${cottage.slug}`,
        description: cottage.description,
        image: cottage.images.map((img) => `${SITE_URL}${img}`),
        occupancy: cottage.capacitySummary ? { "@type": "QuantitativeValue", unitText: cottage.capacitySummary } : undefined,
        amenityFeature: cottage.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
        isPartOf: { "@type": "LodgingBusiness", name: "RosaryNest", url: SITE_URL },
        offers: {
          "@type": "Offer",
          url: bookingUrl,
          priceCurrency: "INR",
          price: String(cottage.nightlyRate),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(cottage.nightlyRate),
            priceCurrency: "INR",
            unitCode: "DAY",
          },
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  return (
    <>
      <StructuredData data={breadcrumb} />
      {accommodation ? <StructuredData data={accommodation} /> : null}
      <section className="cottage-hero">
        <div className="img" data-reveal="image">
          <SiteImage src={cottage.images[0]} alt={getAltText(cottage.images[0], cottage.name)} priority />
        </div>
        <div className="meta-row">
          <div>
            <div className="kicker" data-reveal="eyebrow">{cottage.tagline}</div>
            <h1 data-reveal="heading">
              {cottage.name.split(" ")[0]} <em>{cottage.name.split(" ").slice(1).join(" ")}</em>
            </h1>
          </div>
          <div className="spec" data-reveal="fade">
            <span>Capacity</span>
            {cottage.capacitySummary}
            {cottage.nightlyRate ? (
              <>
                <br />
                <span>From</span>
                ₹{cottage.nightlyRate.toLocaleString("en-IN")}/night
              </>
            ) : null}
          </div>
        </div>
      </section>

      <div className="opener-para">
        <p data-reveal="body">{cottage.description}</p>
      </div>

      <DetailGallery images={cottage.images} title={cottage.name} />

      {videoId ? (
        <section className="cottage-video">
          <YouTubeFacade
            videoId={videoId}
            posterUrl={cottage.videoPosterUrl}
            caption={cottage.videoCaption}
            title={cottage.name}
          />
        </section>
      ) : null}

      <section className="cottage">
        <div className="inner">
          <div className="info-col">
            <div className="num" data-reveal="eyebrow">Amenities</div>
            <div className="amenities" data-reveal-group>
              {cottage.amenities.map((a, ai) => (
                <div className="amenity" key={a} data-reveal="fade" style={{ "--reveal-i": ai } as React.CSSProperties}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" strokeWidth="1.2">
                    <path d="M3 8.5 L6.5 12 L13 4" />
                  </svg>
                  {a}
                </div>
              ))}
            </div>
            <div className="book-cta">
              <Link className="booking-link" href={bookingUrl} {...bookingProps}>
                Check availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      {others.length ? (
        <section className="other-cottages">
          <div className="head">
            <h3 data-reveal="heading">Other cottages</h3>
          </div>
          <div className="row" data-reveal-group>
            {others.map((c, i) => (
              <Link className="thumb" href={`/cottages/${c.slug}`} key={c.slug} style={{ "--reveal-i": i } as React.CSSProperties}>
                <div className="img" data-reveal="image">
                  <SiteImage src={c.images[0]} alt={getAltText(c.images[0], c.name)} sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="name" data-reveal="fade">{c.name}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
