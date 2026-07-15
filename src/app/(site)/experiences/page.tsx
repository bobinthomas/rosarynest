import Link from "next/link";
import { SiteImage } from "@/components/SiteImage";
import { getExperiences } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { getAltText } from "@/lib/image-alt";

export const metadata = buildMetadata({
  title: "Experiences — RosaryNest",
  description:
    "Stargazing, forest trails, farm-to-table meals, and lake walks at RosaryNest in Munnar — nothing scheduled, everything optional.",
  path: "/experiences",
});

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <>
      <section className="exp-hero">
        <div className="text">
          <div className="kicker" data-reveal="eyebrow">Experiences</div>
          <h1 data-reveal="heading">Nothing scheduled. <em>Everything optional.</em></h1>
          <p className="sub" data-reveal="body">where stillness stays</p>
        </div>
        <div className="img" data-reveal="image">
          <SiteImage
            src={experiences[0]?.images[0] ?? ""}
            alt=""
            priority
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      <div className="intro-block">
        <p data-reveal="body">Stargazing on the lawn, bonfires when the mist allows, dinners cooked from the garden. Pick a few, or none at all.</p>
      </div>

      <div className="exp-grid" data-reveal-group>
        {experiences.map((exp, i) => (
          <Link
            className={`exp-card${i === 3 ? " tall" : ""}${i === 4 ? " wide" : ""}`}
            href={`/experiences/${exp.slug}`}
            key={exp.slug}
            style={{ "--reveal-i": i } as React.CSSProperties}
          >
            <div className="img-wrap" data-reveal="image">
              <SiteImage
                className="img"
                src={exp.images[0]}
                alt={getAltText(exp.images[0], exp.title)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="num" data-reveal="eyebrow">{String(i + 1).padStart(2, "0")}.</div>
            <h3 data-reveal="fade">{exp.title}</h3>
            <p className="blurb" data-reveal="fade">{exp.summary}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
