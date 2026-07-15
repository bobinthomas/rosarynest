import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteImage } from "@/components/SiteImage";
import { DetailGallery } from "@/components/DetailGallery";
import { StructuredData } from "@/components/StructuredData";
import { getExperienceBySlug, getExperiences } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { getAltText } from "@/lib/image-alt";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  return buildMetadata({
    title: `${experience.title} — RosaryNest`,
    description: `${experience.summary} ${experience.duration} — an unscheduled experience for guests staying at RosaryNest in Munnar.`,
    path: `/experiences/${experience.slug}`,
    image: experience.images[0],
  });
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  const others = (await getExperiences()).filter((e) => e.slug !== slug).slice(0, 3);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Experiences", item: `${SITE_URL}/experiences` },
      { "@type": "ListItem", position: 2, name: experience.title, item: `${SITE_URL}/experiences/${experience.slug}` },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumb} />
      <section className="cottage-hero">
        <div className="img" data-reveal="image">
          <SiteImage src={experience.images[0]} alt={getAltText(experience.images[0], experience.title)} priority />
        </div>
        <div className="meta-row">
          <div>
            <div className="kicker" data-reveal="eyebrow">{experience.summary}</div>
            <h1 data-reveal="heading">{experience.title}</h1>
          </div>
          <div className="spec" data-reveal="fade">
            <span>Duration</span>
            {experience.duration}
            <br />
            <span>Cost</span>
            {experience.cost}
          </div>
        </div>
      </section>

      <div className="opener-para">
        <p data-reveal="body">{experience.content}</p>
      </div>

      <DetailGallery images={experience.images} title={experience.title} />

      <section className="cottage">
        <div className="inner">
          <div className="info-col">
            <div className="num" data-reveal="eyebrow">What&#39;s included</div>
            <div className="amenities" data-reveal-group>
              {experience.included.map((item, i) => (
                <div className="amenity" key={item} data-reveal="fade" style={{ "--reveal-i": i } as React.CSSProperties}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" strokeWidth="1.2">
                    <path d="M3 8.5 L6.5 12 L13 4" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
            <div className="book-cta">
              <Link className="booking-link" href="/book">Check availability</Link>
            </div>
          </div>
        </div>
      </section>

      {others.length ? (
        <section className="other-cottages">
          <div className="head">
            <h3 data-reveal="heading">Other experiences</h3>
          </div>
          <div className="row" data-reveal-group>
            {others.map((e, i) => (
              <Link className="thumb" href={`/experiences/${e.slug}`} key={e.slug} style={{ "--reveal-i": i } as React.CSSProperties}>
                <div className="img" data-reveal="image">
                  <SiteImage src={e.images[0]} alt={getAltText(e.images[0], e.title)} sizes="(max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="name" data-reveal="fade">{e.title}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
