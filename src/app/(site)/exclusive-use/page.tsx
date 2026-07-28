import { ExclusiveEnquiryForm } from "@/components/ExclusiveEnquiryForm";
import { OCCASION_OPTIONS } from "@/lib/exclusive-enquiry";
import { buildMetadata } from "@/lib/metadata";
import { getSettings } from "@/lib/content";
import styles from "@/styles/exclusive-use.module.css";

export const metadata = buildMetadata({
  title: "Exclusive Use — RosaryNest",
  description:
    "Take over the entire RosaryNest property for your group. No other guests, no shared spaces — the house and grounds are yours to run however you like.",
  path: "/exclusive-use",
});

const OCCASION_PILLS = OCCASION_OPTIONS.slice(0, 5);

export default async function ExclusiveUsePage() {
  const settings = await getSettings();

  return (
    <>
      <section className="compact-hero">
        <div className="kicker" data-reveal="eyebrow">Exclusive use</div>
        <h1 data-reveal="heading">The whole of Rosary Nest, <em>just for you.</em></h1>
        <p className="subhead" data-reveal="body">
          Take over the entire property from two nights. No other guests, no shared spaces, no fixed
          schedule. The house and the grounds are yours to run however your group wants them.
        </p>
      </section>

      <div className={styles.pills} data-reveal="fade">
        {OCCASION_PILLS.map((occasion) => (
          <span key={occasion} className={styles.pill}>{occasion}</span>
        ))}
      </div>

      <div className="card-grid cols-3" data-reveal-group>
        <div className="card" style={{ "--reveal-i": 0 } as React.CSSProperties} data-reveal="fade">
          <div className="num">01</div>
          <h3>Every room, yours</h3>
          <p className="blurb">All rooms held under one booking.</p>
        </div>
        <div className="card" style={{ "--reveal-i": 1 } as React.CSSProperties} data-reveal="fade">
          <div className="num">02</div>
          <h3>The grounds included</h3>
          <p className="blurb">Lawns, living areas and terraces, uninterrupted.</p>
        </div>
        <div className="card" style={{ "--reveal-i": 2 } as React.CSSProperties} data-reveal="fade">
          <div className="num">03</div>
          <h3>Run it your way</h3>
          <p className="blurb">Full kitchen access included — bring your own caterer, cook, or plans, no restrictions.</p>
        </div>
      </div>

      <div className={styles.note} data-reveal="fade">
        <p className="privacy-note">
          We provide the space. Meals and catering are not included, and you are welcome to make your
          own arrangements.
        </p>
      </div>

      <section className={`container-narrow ${styles.enquirySection}`} data-reveal="fade">
        <ExclusiveEnquiryForm whatsappNumber={settings.whatsapp || settings.phone} />
      </section>
    </>
  );
}
