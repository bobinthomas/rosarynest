import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/metadata";
import { getSettings } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Plan Your Stay — RosaryNest",
  description:
    "Everything you need before arriving at RosaryNest in Munnar — how to get here, the best time to visit, and answers to common questions.",
  path: "/plan-your-stay",
});

const links = [
  { href: "/plan-your-stay/how-to-reach", title: "Getting here", desc: "Munnar is a journey. We hope it's part of the pleasure." },
  { href: "/plan-your-stay/best-time", title: "Best time to visit", desc: "What changes through the year, and what stays the same." },
  { href: "/plan-your-stay/faq", title: "FAQ", desc: "The real questions, gathered and answered honestly." },
];

export default async function PlanYourStayPage() {
  const settings = await getSettings();
  const bookingUrl = settings.booking_url || "/book";
  const bookingProps = settings.booking_url
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <>
      <PageHero
        kicker="Plan Your Stay"
        title="Everything you need,"
        emphasis="before you arrive."
        subhead="A few pages to help you get here, choose your season, and answer the questions we hear most."
      />

      <section className="exp-grid" data-reveal-group>
        {links.map((l, i) => (
          <Link className="exp-card" href={l.href} key={l.href} style={{ "--reveal-i": i } as React.CSSProperties}>
            <h3 data-reveal="heading">{l.title}</h3>
            <p className="blurb" data-reveal="fade">{l.desc}</p>
          </Link>
        ))}
        <Link
          className="exp-card"
          href={bookingUrl}
          style={{ "--reveal-i": links.length } as React.CSSProperties}
          {...bookingProps}
        >
          <h3 data-reveal="heading">Check availability</h3>
          <p className="blurb" data-reveal="fade">Direct bookings include welcome drinks and our best rate.</p>
        </Link>
      </section>
    </>
  );
}
