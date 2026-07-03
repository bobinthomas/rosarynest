import { PageHero } from "@/components/PageHero";
import { getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy — RosaryNest",
  description:
    "How RosaryNest handles your information — what we collect to manage a booking, and what we never do with it.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero kicker="Legal" title="Privacy" emphasis="policy." />
      <div className="post-body" style={{ paddingBottom: 120 }} data-reveal-group>
        <p data-reveal="body" style={{ "--reveal-i": 0 } as React.CSSProperties}>
          We collect only what we need to manage your booking and answer your questions: your name,
          contact details, and any preferences you share with us. We don&#39;t sell or share your
          details with third parties, and we don&#39;t use tracking advertising on this site.
        </p>
        <p data-reveal="fade" style={{ "--reveal-i": 1 } as React.CSSProperties}>
          Payment details are handled directly by our payment processor and are never stored on our
          servers. If you&#39;d like your information removed from our records, write to us at{" "}
          <a href={`mailto:${settings.email}`}>{settings.email}</a>.
        </p>
      </div>
    </>
  );
}
