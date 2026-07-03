import Link from "next/link";
import { getCottages, getPosts, getSettings } from "@/lib/content";
import { HeroParallax } from "@/components/HeroParallax";
import { SiteImage } from "@/components/SiteImage";
import { getAltText } from "@/lib/image-alt";

export default async function Home() {
  const [cottages, latestPosts, settings] = await Promise.all([
    getCottages(),
    getPosts(2),
    getSettings(),
  ]);

  const useHeroImage = settings.hero_media_type === "image" && Boolean(settings.hero_image_url);

  const heroVideoSrc = settings.hero_video_url || "/video/Hero-new.mp4";

  return (
    <>
      {!useHeroImage ? <link rel="preload" as="video" href={heroVideoSrc} /> : null}
      <section className="hero scene" data-chapter="01 · Arrival">
        <HeroParallax>
          <div className={`hero-img ${useHeroImage ? "has-image" : "has-video"}`}>
            {useHeroImage ? (
              <SiteImage src={settings.hero_image_url} alt="" priority />
            ) : (
              <video className="hero-video" autoPlay muted loop playsInline preload="auto">
                <source src={heroVideoSrc} type="video/mp4" />
              </video>
            )}
          </div>
        </HeroParallax>

        <div className="corner">
          Latitude {settings.latitude}° N<br />
          Longitude {settings.longitude}° E
        </div>
        <div className="corner corner-r">
          Established {settings.established_year}<br />
          Seven cottages
        </div>

        <div className="hero-content">
          <h1>
            <span className="line-wrap">
              <span className="line">A quiet retreat in</span>
            </span>
            <span className="line-wrap">
              <span className="line"><em>the hills of Munnar.</em></span>
            </span>
          </h1>
          <p className="sub">Seven cottages, two pools, a forest, and a lake — tucked away from the town.</p>
        </div>

        <div className="scroll-cue">
          Scroll
          <span className="line"></span>
        </div>
      </section>

      <section className="intro scene" data-chapter="02 · Introduction">
        <div className="container-narrow intro-pin">
          <div className="kicker" data-reveal="eyebrow">An introduction</div>
          <p data-reveal="body">
            Rosary Nest is a small family-run retreat in the hills above Munnar, where forest meets
            valley meets water. Built by a family that has lived on this land for two generations, it
            is a place to slow down — not to tick things off a list.
          </p>
          <div className="est" data-reveal="fade">est. {settings.established_year} · vellathooval · kerala</div>
        </div>
      </section>

      <section className="pillars scene" data-chapter="03 · The Estate">
        <div className="row" data-reveal-group>
          <div className="pillar" style={{ "--reveal-i": 0 } as React.CSSProperties}>
            <div className="icon-frame" data-reveal="fade">
              <svg width="64" height="80" viewBox="0 0 64 80" fill="none" stroke="#2D3F2F" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 70 Q 20 50 32 56 T 62 50" strokeWidth="1.3" />
                <path d="M2 62 Q 18 44 32 48 T 62 42" strokeWidth="1" opacity="0.7" />
                <path d="M2 54 Q 18 38 32 40 T 62 34" strokeWidth="0.8" opacity="0.45" />
                <line x1="32" y1="58" x2="32" y2="78" strokeWidth="0.6" opacity="0.4" strokeDasharray="1 3" />
              </svg>
            </div>
            <div className="num" data-reveal="eyebrow">i.</div>
            <h3 data-reveal="heading">The Land</h3>
            <p data-reveal="body">
              A south-facing fold of forest above the Periyar valley, with a lake at its foot and a dam
              beyond. The town is twenty minutes the other way; here, no one is hurrying anywhere.
            </p>
            <Link className="quiet-link" href="/the-land">Walk the property →</Link>
          </div>
          <div className="pillar" style={{ "--reveal-i": 1 } as React.CSSProperties}>
            <div className="icon-frame" data-reveal="fade">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#2D3F2F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
                <path d="M10 70 L 10 40 L 40 18 L 70 40 L 70 70 Z" />
                <path d="M40 70 L 40 46" />
                <path d="M28 70 L 28 56 L 52 56 L 52 70" />
                <line x1="6" y1="70" x2="74" y2="70" strokeWidth="0.6" />
              </svg>
            </div>
            <div className="num" data-reveal="eyebrow">ii.</div>
            <h3 data-reveal="heading">The Cottages</h3>
            <p data-reveal="body">
              Four cottages in four shapes — Forest, Lake, Family, Garden. Each has a fireplace, a deep
              tub, a long window, and no television. Beds are dressed in linen; mornings begin with tea.
            </p>
            <Link className="quiet-link" href="/cottages">See the cottages →</Link>
          </div>
          <div className="pillar" style={{ "--reveal-i": 2 } as React.CSSProperties}>
            <div className="icon-frame" data-reveal="fade">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#2D3F2F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1">
                <circle cx="40" cy="42" r="14" />
                <path d="M40 22 L 40 12" />
                <path d="M40 72 L 40 62" />
                <path d="M20 42 L 10 42" />
                <path d="M70 42 L 60 42" />
                <path d="M26 28 L 20 22" />
                <path d="M54 28 L 60 22" />
                <path d="M26 56 L 20 62" />
                <path d="M54 56 L 60 62" />
              </svg>
            </div>
            <div className="num" data-reveal="eyebrow">iii.</div>
            <h3 data-reveal="heading">The Experiences</h3>
            <p data-reveal="body">
              Stargazing on the lawn, bonfires when the mist allows, dinners cooked from the garden and
              the morning&#39;s market. Nothing scheduled. Everything optional.
            </p>
            <Link className="quiet-link" href="/experiences">Read the daybook →</Link>
          </div>
        </div>
      </section>

      <section className="cottages scene" data-chapter="04 · Cottages">
        <div className="head">
          <div className="left">
            <div className="eyebrow kicker u-color-copper" data-reveal="eyebrow">A Peek</div>
            <h2 data-reveal="heading">
              <span className="line-wrap"><span className="line">Four cottage types, <em>four in all.</em></span></span>
            </h2>
          </div>
          <div className="right" data-reveal="body">Each room sits at a different altitude on the property. None of them face another.</div>
        </div>

        <div className="cottage-grid" data-reveal-group>
          {cottages.map((cottage, i) => (
            <Link
              key={cottage.slug}
              className={`cottage-card c-0${i + 1}`}
              href={`/cottages/${cottage.slug}`}
              style={{ "--reveal-i": i } as React.CSSProperties}
            >
              <div className="img" data-reveal="image">
                <SiteImage
                  src={cottage.images[0]}
                  alt={getAltText(cottage.images[0], cottage.name)}
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
              </div>
              <div className="info" data-reveal="fade">
                <div className="name">{cottage.name}</div>
                <div className="meta">{cottage.tagline}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="footer-link">
          <Link className="quiet-link" href="/cottages">View all cottages →</Link>
        </div>
      </section>

      <section className="journal scene" data-chapter="05 · Journal">
        <div className="head">
          <div>
            <div className="eyebrow u-mb-18" data-reveal="eyebrow">The Journal</div>
            <h2 data-reveal="heading"><span className="line-wrap"><span className="line">Field notes, <em>kept slowly.</em></span></span></h2>
          </div>
          <div className="right u-align-self-end">
            <Link className="quiet-link" href="/journal">All entries →</Link>
          </div>
        </div>

        <div className="journal-grid" data-reveal-group>
          {latestPosts.map((post, i) => (
            <Link
              key={post.slug}
              className="post"
              href={`/journal/${post.slug}`}
              style={{ "--reveal-i": i } as React.CSSProperties}
            >
              <div className="img" data-reveal="image">
                <SiteImage src={post.featuredImage ?? ""} alt={post.title} sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="meta" data-reveal="fade">
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                <span className="dot">·</span>
                <span>{post.category}</span>
              </div>
              <h3 data-reveal="fade">{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="reserve-block scene" id="reserve" data-chapter="06 · Reserve">
        <div className="inner">
          <div className="kicker eyebrow" data-reveal="eyebrow">Plan your stay</div>
          <h2 data-reveal="heading">
            <span className="line-wrap"><span className="line">Three nights, <em>at least.</em></span></span>
            <span className="line-wrap"><span className="line">The place takes a day to soften.</span></span>
          </h2>

          <form className="reserve-form" action="/book" method="get" data-reveal="fade">
            <div className="field">
              <label>Arrival</label>
              <input type="text" name="arrival" placeholder="Thu, 14 May" />
            </div>
            <div className="field">
              <label>Departure</label>
              <input type="text" name="departure" placeholder="Sun, 17 May" />
            </div>
            <div className="field">
              <label>Guests</label>
              <input type="text" name="guests" placeholder="2 adults" />
            </div>
            <button type="submit">Check availability</button>
          </form>

          <div className="aside">
            or call us at <a href={`tel:${settings.phone}`}>{settings.phone}</a> — we answer personally.
          </div>
        </div>
      </section>
    </>
  );
}
