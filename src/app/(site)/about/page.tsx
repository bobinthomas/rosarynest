import { SiteImage } from "@/components/SiteImage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us — RosaryNest",
  description:
    "A small family-run retreat in the hills above Munnar — built slowly on land the family has farmed for generations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <article className="opener">
        <div className="kicker" data-reveal="eyebrow">About Us</div>
        <h1 data-reveal="heading">A place that grew out of <em>the land.</em></h1>
        <p className="lede" data-reveal="body">
          RosaryNest is a small, family-run retreat in the mist-covered hills above Munnar. Luxury,
          to us, is not about excess. It is found in stillness, fresh mountain air, and the simple
          pleasure of slowing down.
        </p>
      </article>

      <section className="two-col">
        <h2 className="section-title" data-reveal="heading">I. <span>How it began</span></h2>
        <p data-reveal="body">
          This land has been with one family for generations. It was a working cardamom farm long
          before it was anything else — planted, tended, and lived on through good seasons and hard
          ones. The retreat came later, almost by accident: when farming alone could no longer
          sustain the land, the family chose to open it up rather than leave it behind. One cottage
          at a time, one guest at a time.
        </p>
        <p data-reveal="fade">
          Nothing here was master-planned. The cottages went up between trees that were already
          standing, on terraces the farm had already shaped. That slowness shows, and we&#39;ve
          stopped apologising for it.
        </p>
      </section>

      <section className="pull-quote">
        <blockquote data-reveal="fade"><p>&#8220;We are not innkeepers. We are a family who happens to have a few extra rooms on land we love.&#8221;</p></blockquote>
        <div className="attr" data-reveal="fade">— The family</div>
      </section>

      <section className="two-col">
        <h2 className="section-title" data-reveal="heading">II. <span>How we host</span></h2>
        <p data-reveal="body">
          There is no front desk and no uniformed staff. The people who welcome you, cook for you,
          and walk you to your cottage are the family and a small team who have been part of this
          place for years. Breakfast is made fresh each morning; dinner comes mostly from the garden
          and the day&#39;s market. If you need something, you ask a person, not a phone extension.
        </p>
      </section>

      {/* TODO: swap for a real family/property photo or video once supplied — placeholder until then. */}
      <figure className="full-bleed">
        <div className="img" data-reveal="image">
          <SiteImage src="/images/placeholder-coming-soon.svg" alt="" />
        </div>
      </figure>

      <section className="two-col" style={{ paddingBottom: 120 }}>
        <h2 className="section-title" data-reveal="heading">III. <span>What we believe</span></h2>
        <p data-reveal="body">
          That a good stay needs very little: a warm room, honest food, quiet, and time. We
          don&#39;t schedule your days, and we don&#39;t fill the property with things to do. The
          forest, the lake, and the weather provide more than enough — our job is simply to stay out
          of their way, and yours.
        </p>
      </section>
    </>
  );
}
