import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Best Time to Visit — RosaryNest",
  description:
    "What changes through the year at RosaryNest in Munnar, and what stays the same — from cold, clear Decembers to the quiet of monsoon.",
  path: "/plan-your-stay/best-time",
});

const seasons = [
  {
    title: "December to February",
    subtitle: "Cold mornings, clear skies.",
    body: "The mornings are cold enough that the fireplaces earn their keep. Cardamom is being harvested; the kitchen smells of it from a long way off. The light is hard and clean and the valley is visible to the horizon. Bring a jumper for after sunset.",
  },
  {
    title: "March to May",
    subtitle: "Long afternoons, low lake.",
    body: "The heat doesn't arrive the way it does in the plains, but the afternoons get long and the mist settles and lifts earlier. The mango is in fruit, briefly. The lake is at its lowest, and the cicadas are at their loudest.",
  },
  {
    title: "June to August",
    subtitle: "Monsoon — for the few who ask.",
    body: "We recommend this season to almost no one — and the few who know to ask for it never forget it. The rain comes sideways for weeks at a stretch, and the land does what monsoons let it do: flowers, mushrooms, frogs the size of teacups.",
  },
  {
    title: "September to November",
    subtitle: "The most generous stretch.",
    body: "The rain has gone, the green has stayed, and the property is at its most generous. The pepper is ripening. The afternoons are warm, the evenings are cool. It is the easiest time to come, and the hardest time to get a room.",
  },
];

export default function BestTimePage() {
  return (
    <>
      <section className="compact-hero">
        <div className="kicker" data-reveal="eyebrow">Best Time to Visit</div>
        <h1 data-reveal="heading">What changes, <em>and what stays.</em></h1>
        <p className="subhead" data-reveal="body">There isn&#39;t really a wrong time — only a different one.</p>
      </section>

      <section className="two-col" data-reveal-group>
        {seasons.map((s, i) => (
          <div key={s.title} style={{ marginBottom: 48, "--reveal-i": i } as React.CSSProperties}>
            <h2 className="section-title" data-reveal="heading"><span>{s.title}</span></h2>
            <p
              data-reveal="eyebrow"
              style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--ink-soft)", marginBottom: 8 }}
            >
              {s.subtitle}
            </p>
            <p data-reveal="body">{s.body}</p>
          </div>
        ))}
      </section>

      <section className="cta-strip">
        <p className="line" data-reveal="heading">Found your season?</p>
        <Link className="quiet-link" href="/book">Check availability →</Link>
      </section>
    </>
  );
}
