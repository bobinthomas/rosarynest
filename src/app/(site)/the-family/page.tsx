import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The Family — RosaryNest",
  description:
    "Three generations run RosaryNest in Munnar. Meet the family who turned a cardamom farm into a quiet hillside retreat.",
  path: "/the-family",
});

const staff = [
  { name: "Annamma", role: "Founder · 91 years on this land" },
  { name: "Roy", role: "Second generation · breakfast" },
  { name: "Anna", role: "Third generation · kitchen & journal" },
  { name: "Tom", role: "Third generation · property & land" },
  { name: "Lakshmi", role: "Cook · since 1999" },
  { name: "Suresh", role: "Garden & market" },
];

export default function TheFamilyPage() {
  return (
    <>
      <article className="opener">
        <div className="kicker" data-reveal="eyebrow">The Family</div>
        <h1 data-reveal="heading">People who happen to have <em>extra rooms.</em></h1>
        <p className="lede" data-reveal="body">
          Rosary Nest is a boutique cottage retreat in Munnar&#39;s mist-covered hills, run by the
          same family that has lived on this land for three generations. Luxury, to us, is not about
          excess. It is found in stillness, fresh mountain air, and the simple joy of slowing down.
        </p>
      </article>

      <section className="two-col">
        <h2 className="section-title" data-reveal="heading">I. <span>How it started</span></h2>
        <p data-reveal="body">
          The grandfather arrived with permission and hand tools, clearing evergreen forest to plant
          cardamom, living in a hut for two years while the road was built. None of it was for a
          resort — the resort came much later, almost by accident.
        </p>
        <p data-reveal="fade">
          The father farmed cardamom until 2009, when falling prices and unpredictable seasons made
          it unworkable, and the siblings scattered. Rather than let the land sit, the family
          repurposed it — cottage by cottage, guest by guest.
        </p>
      </section>

      <section className="pull-quote">
        <blockquote data-reveal="fade"><p>&#8220;We are not innkeepers. We are people who happen to have extra rooms on land we love.&#8221;</p></blockquote>
        <div className="attr" data-reveal="fade">— The family</div>
      </section>

      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 56px 120px" }}>
        <h2 className="section-title" data-reveal="heading" style={{ marginBottom: 40 }}>II. <span>Who you&#39;ll meet</span></h2>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}
          data-reveal-group
        >
          {staff.map((person, i) => (
            <div key={person.name} data-reveal="fade" style={{ "--reveal-i": i } as React.CSSProperties}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--forest)" }}>{person.name}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--mute)", marginTop: 6 }}>
                {person.role}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
