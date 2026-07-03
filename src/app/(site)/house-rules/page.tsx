import { PageHero } from "@/components/PageHero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "House Rules — RosaryNest",
  description:
    "House rules for guests staying at RosaryNest in Munnar — plain English, no fine print, covering pets, quiet hours, and dietary needs.",
  path: "/house-rules",
});

const rules = [
  "No pets, other than registered service animals — the property has two resident dogs and a kitchen cat.",
  "No smoking inside the cottages; ashtrays are provided on the verandas.",
  "Quiet hours after 10 pm, out of respect for other guests and the resident nightjar.",
  "Children are welcome, but toddlers need supervision near the lower terrace stream.",
  "No outside catering in the dining areas — we're happy to accommodate dietary needs directly.",
];

export default function HouseRulesPage() {
  return (
    <>
      <PageHero kicker="Legal" title="House" emphasis="rules." subhead="Plain English, no fine print." />
      <div className="post-body" style={{ paddingBottom: 120 }}>
        <ul data-reveal-group>
          {rules.map((rule, i) => (
            <li key={rule} data-reveal="fade" style={{ "--reveal-i": i } as React.CSSProperties}>{rule}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
