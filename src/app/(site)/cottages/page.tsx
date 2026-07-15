import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SiteImage } from "@/components/SiteImage";
import { getCottages } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { getAltText } from "@/lib/image-alt";

export const metadata = buildMetadata({
  title: "Cottages — RosaryNest",
  description:
    "Four cottages at RosaryNest in Munnar, each at a different altitude on the property — long windows and no televisions. See which one suits your stay.",
  path: "/cottages",
});

export default async function CottagesPage() {
  const cottages = await getCottages();

  return (
    <>
      <PageHero
        kicker="Cottages"
        title="Four cottages,"
        emphasis="four ways to be still."
        subhead="Each sits at a different altitude on the property. None of them face another."
      />

      {cottages.map((cottage, i) => (
        <section key={cottage.slug} className={`cottage${i % 2 === 1 ? " right" : ""}`}>
          <div className="inner">
            <div className="img-col">
              <div className="img" data-reveal="image">
                <SiteImage
                  src={cottage.images[0]}
                  alt={getAltText(cottage.images[0], cottage.name)}
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="img-tag" data-reveal="fade">
                <strong>{cottage.capacitySummary}</strong>
              </div>
            </div>
            <div className="info-col">
              <div className="num" data-reveal="eyebrow">{String(i + 1).padStart(2, "0")}.</div>
              <h2 data-reveal="heading">
                {cottage.name.split(" ")[0]} <em>{cottage.name.split(" ").slice(1).join(" ")}</em>
              </h2>
              <div className="meta-line" data-reveal="fade">{cottage.tagline}</div>
              <p className="desc" data-reveal="body">{cottage.description}</p>
              <div className="amenities" data-reveal-group>
                {cottage.amenities.slice(0, 6).map((a, ai) => (
                  <div className="amenity" key={a} data-reveal="fade" style={{ "--reveal-i": ai } as React.CSSProperties}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" strokeWidth="1.2">
                      <path d="M3 8.5 L6.5 12 L13 4" />
                    </svg>
                    {a}
                  </div>
                ))}
              </div>
              <Link className="quiet-link" href={`/cottages/${cottage.slug}`}>
                See {cottage.name} →
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="stay-cta">
        <div className="inner">
          <div>
            <h2 data-reveal="heading">Ready when <em>you are.</em></h2>
            <p className="intro-line" data-reveal="body">Stay as long as you like — the place takes a day to soften.</p>
          </div>
          <div>
            <Link className="quiet-link" href="/book">Check availability →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
