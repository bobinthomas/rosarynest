export function PageHero({
  kicker,
  title,
  emphasis,
  subhead,
}: {
  kicker: string;
  title: string;
  emphasis?: string;
  subhead?: string;
}) {
  return (
    <section className="compact-hero">
      <div className="kicker" data-reveal="eyebrow">{kicker}</div>
      <h1 data-reveal="heading">
        {title} {emphasis ? <em>{emphasis}</em> : null}
      </h1>
      {subhead ? <p className="subhead" data-reveal="body">{subhead}</p> : null}
    </section>
  );
}
