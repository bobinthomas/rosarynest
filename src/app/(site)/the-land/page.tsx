import { SiteImage } from "@/components/SiteImage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "The Land — RosaryNest",
  description:
    "Three acres of high-elevation forest above the valley below, with a lake at its foot — the setting behind RosaryNest in Munnar.",
  path: "/the-land",
  image: "/images/munnar-beauty.jpg",
});

export default function TheLandPage() {
  return (
    <>
      <article className="opener">
        <div className="kicker" data-reveal="eyebrow">The Setting</div>
        <h1 data-reveal="heading">Tucked away <em>from Munnar.</em></h1>
        <p className="lede" data-reveal="body">
          The road from Munnar town keeps climbing for twenty minutes after most people have stopped
          paying attention. It bends past the tea estates, past the last cluster of shops, past the
          gate that says nothing in particular. Then the forest begins, and the property begins
          inside it. There is no signage of consequence; we prefer it that way.
        </p>
        <div className="byline" data-reveal="fade">
          <div><strong>Words by</strong> The family</div>
          <div><strong>Read time</strong> 9 minutes</div>
          <div><strong>Filed</strong> May 2026</div>
          <div><strong>Field notes</strong> Vol. 12</div>
        </div>
      </article>

      <figure className="full-bleed">
        <div className="img" data-reveal="image">
          <SiteImage src="/images/munnar-beauty.jpg" alt="Property panorama, valley, mist lifting" priority />
        </div>
        <figcaption className="caption" data-reveal="fade">
          <strong>FB · 01</strong> The west-facing fold of the property, photographed from the dam
          road, an hour after sunrise.
        </figcaption>
      </figure>

      <section className="two-col">
        <h2 className="section-title" data-reveal="heading">II. <span>The forest, and what the valley does to the light</span></h2>
        <p data-reveal="body">
          RosaryNest sits on three acres of high-elevation evergreen forest, at 1,650 metres above
          the valley below. The trees here are older than the resort by a wide margin — silver oak,
          jamun, wild jackfruit, with cardamom growing in the understorey because the family has always
          grown cardamom. None of it was planted for effect. The cottages went up between the trees
          that were already there.
        </p>
        <p data-reveal="fade">
          The valley falls away to the south-west, which is to say the property is on the right side
          of the hill for sunsets and on the wrong side for early sun. Mornings arrive slowly; by the
          time the light has crested the ridge behind the kitchen, the mist that pooled overnight in
          the valley has begun to lift in long slow exhalations.
        </p>
        <p data-reveal="fade">
          The wind comes up the valley most afternoons, smelling of wet earth and, in the right
          months, of cardamom flower. It carries the sound of the lake more clearly than you&#39;d
          expect — boats, sometimes, but mostly water against the stones. By six o&#39;clock the
          forest is louder than the valley: the cicadas start, then the frogs from the lower
          terraces, then a single nightjar that has been on this property for as long as anyone in
          the family has been listening for it.
        </p>
        <p data-reveal="fade">
          There is no fence at the edge of the property; the forest simply continues, and most guests
          do not bother to find out where it stops being ours.
        </p>
      </section>

      <section className="pull-quote">
        <blockquote data-reveal="fade"><p>&#8220;We came for two nights and kept finding reasons to stay a third. Nowhere else on the trip felt like it belonged to the hill rather than to the tourist season.&#8221;</p></blockquote>
        <div className="attr" data-reveal="fade">— A guest, writing to us after checkout</div>
      </section>

      <section className="lake-section">
        <div className="text">
          <h3 data-reveal="heading">III. The water</h3>
          <div className="title" data-reveal="eyebrow">The lake, <em>and the dam beyond it.</em></div>
          <p data-reveal="body">
            The lake is not ours, exactly. It belongs to the valley and to the dam that holds back
            the river a kilometre further down. But the path from the lower terrace to the lake is on
            our land, and so is the boat we keep tied to the alder at the bottom of it.
          </p>
          <p data-reveal="fade">
            In the dry months the lake recedes by a metre and the white stones come back — the stones
            the children name, year after year, as if they are pets that go away in summer. In the
            rains it rises to within a few yards of the path.
          </p>
          <p data-reveal="fade">
            We do not advertise the lake as a swimming lake, although guests swim in it. It is simply
            there, the same way the wind is there, and the cardamom, and the road that climbs for
            twenty minutes after most people have stopped paying attention.
          </p>
        </div>
        <div className="lake-gallery" data-reveal-group>
          <div className="img g-1" data-reveal="image" style={{ "--reveal-i": 0 } as React.CSSProperties}>
            <SiteImage src="/images/dam-sengulam-munnar.png" alt="Lake from lower terrace, dawn" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="img g-2" data-reveal="image" style={{ "--reveal-i": 1 } as React.CSSProperties}>
            <SiteImage src="/images/path-view-1.jpg" alt="Boat tied to alder, still water" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="img g-3" data-reveal="image" style={{ "--reveal-i": 2 } as React.CSSProperties}>
            <SiteImage src="/images/tea-munnar-dam.png" alt="Dam wall from the far ridge" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="seasons" data-reveal-group>
        <h3 data-reveal="heading">IV. The Calendar</h3>
        <div className="title" data-reveal="eyebrow">What changes, <em>and what stays.</em></div>
        <p data-reveal="fade" style={{ "--reveal-i": 0 } as React.CSSProperties}><span className="lead">In January</span> the mornings are cold enough that a fireplace
          earns its keep, in the cottages that have one. Cardamom is being harvested; the kitchen smells of it from
          a long way off. Bring a jumper for after sunset.</p>
        <p data-reveal="fade" style={{ "--reveal-i": 1 } as React.CSSProperties}><span className="lead">In April and May</span> the heat doesn&#39;t arrive the way it does
          in the plains, but the afternoons get long and the mist settles and lifts earlier. The mango
          is in fruit, briefly. The lake is at its lowest.</p>
        <p data-reveal="fade" style={{ "--reveal-i": 2 } as React.CSSProperties}><span className="lead">From June through August</span> the monsoon takes over the
          property. We stay open; the cottages fill more slowly, the rain comes sideways for weeks at a
          stretch, and the land flowers, mushrooms, frogs the size of teacups. This is the season we
          recommend to almost no one and that the few who ask for it never forget.</p>
        <p data-reveal="fade" style={{ "--reveal-i": 3 } as React.CSSProperties}><span className="lead">By October</span> the rain has gone, the green has stayed, and the
          property is at its most generous. It is the easiest time to come, and the hardest time to
          get a room.</p>
      </section>

      <section className="map-section">
        <div className="inner">
          <div className="left">
            <h3 data-reveal="heading">V. Where it is</h3>
            <div className="title" data-reveal="eyebrow">A small map, <em>and what&#39;s near.</em></div>
            <p data-reveal="body">
              The property sits roughly twenty minutes by car from Munnar town, in the direction of
              Vellathooval. We will send you a driver from Kochi if you would like one. The road is
              good until it isn&#39;t; the last three kilometres are slow on purpose.
            </p>
            <ul className="distances" data-reveal="fade">
              <li><div className="place">Munnar town</div><div className="km">18 km</div><div className="by">~ 25 min · car</div></li>
              <li><div className="place">Sengulam Dam <em>— our lake</em></div><div className="km">under 1 km</div><div className="by">a short walk</div></li>
              <li><div className="place">Tea Museum</div><div className="km">21 km</div><div className="by">~ 35 min · car</div></li>
              <li><div className="place">Top Station</div><div className="km">42 km</div><div className="by">~ 90 min · car</div></li>
              <li><div className="place">Eravikulam Park</div><div className="km">32 km</div><div className="by">~ 70 min · car</div></li>
              <li><div className="place">Cochin Airport <em>(COK)</em></div><div className="km">130 km</div><div className="by">~ 4 hrs · car</div></li>
            </ul>
          </div>
          <div className="map-art" data-reveal="image">
            <svg viewBox="0 0 460 600" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="460" height="600" fill="#F5F2EC" />
              <g stroke="#2D3F2F" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 30 200 Q 100 170 180 180 T 320 165 T 430 175" strokeWidth="0.8" opacity="0.55" />
                <path d="M 30 220 Q 90 195 175 205 T 320 195 T 430 205" strokeWidth="0.6" opacity="0.4" />
                <path d="M 30 425 Q 110 395 200 408 T 350 395 T 430 410" strokeWidth="0.7" opacity="0.45" />
              </g>
              <path d="M 120 340 C 100 330, 95 310, 130 300 C 175 290, 220 295, 250 315 C 275 335, 270 365, 240 372 C 200 380, 150 372, 125 360 C 110 354, 110 348, 120 340 Z" fill="#D4C9B3" opacity="0.6" stroke="#2D3F2F" strokeWidth="0.6" />
              <path d="M 380 60 Q 320 100, 300 160 Q 280 230, 260 280 Q 240 320, 220 360 Q 195 405, 175 450" stroke="#A8674A" strokeWidth="1.4" fill="none" strokeDasharray="3 4" strokeLinecap="round" />
              <g transform="translate(165 305)">
                <circle r="6" fill="#A8674A" />
                <circle r="11" fill="none" stroke="#A8674A" strokeWidth="0.7" />
                <text y="-26" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="13" fontStyle="italic" fill="#2D3F2F">RosaryNest</text>
              </g>
              <g transform="translate(390 50)">
                <circle r="3" fill="#2D3F2F" />
                <text y="-8" textAnchor="middle" fontFamily="Google Sans, sans-serif" fontSize="9" letterSpacing="1.5" fill="#1F1F1F">MUNNAR</text>
              </g>
              <text x="175" y="338" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="12" fill="#2D3F2F">the lake</text>
            </svg>
            <div className="map-caption">
              <span>Sketch · not to scale</span>
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <p data-reveal="body">Twenty minutes past the last bend in the Munnar road, the tea estates give way to forest. The house is in that forest.</p>
      </section>
    </>
  );
}
