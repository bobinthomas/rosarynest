import { getFaqs, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "FAQ — RosaryNest",
  description:
    "Answers to the real questions guests ask before staying at RosaryNest in Munnar — cancellations, children, pets, wifi, and getting here.",
  path: "/plan-your-stay/faq",
});

const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSettings()]);

  const groups = new Map<string, typeof faqs>();
  for (const faq of faqs) {
    if (!groups.has(faq.category)) groups.set(faq.category, []);
    groups.get(faq.category)!.push(faq);
  }

  return (
    <>
      <section className="compact-hero">
        <div className="kicker" data-reveal="eyebrow">Frequently Asked</div>
        <h1 data-reveal="heading">Questions <em>guests ask us.</em></h1>
        <p className="subhead" data-reveal="body">If you have one we haven&#39;t answered here, just write to us.</p>
      </section>

      <section className="intro-block">
        <p data-reveal="body">
          These are the real ones — the questions that come in over email and on the phone, gathered
          and answered honestly. We update this list when something new starts coming up.
        </p>
      </section>

      <section className="faq-section">
        {[...groups.entries()].map(([category, items], i) => (
          <div className="group" key={category} data-reveal-group>
            <div className="group-head">
              <h2 data-reveal="heading">{category}</h2>
              <span className="num" data-reveal="eyebrow">{romanNumerals[i] ?? i + 1}.</span>
            </div>
            {items.map((faq, fi) => (
              <details className="q" key={faq.id} data-reveal="fade" style={{ "--reveal-i": Math.min(fi, 4) } as React.CSSProperties}>
                <summary>{faq.question}</summary>
                <div className="answer">{faq.answer}</div>
              </details>
            ))}
          </div>
        ))}
      </section>

      <section className="closing-contact">
        <h3 data-reveal="heading">Still have <em>a question?</em></h3>
        <div className="channels" data-reveal="fade">
          <div>
            <label>Email</label>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
          <div>
            <label>Phone</label>
            <a href={`tel:${settings.phone}`}>{settings.phone}</a>
          </div>
        </div>
        <p className="footnote" data-reveal="fade">We answer everything personally, usually within a day.</p>
      </section>
    </>
  );
}
