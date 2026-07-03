import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "How to Reach — RosaryNest",
  description:
    "Getting to RosaryNest in Munnar by air, train, or road — with driver arrangements and practical notes on the last few kilometres.",
  path: "/plan-your-stay/how-to-reach",
});

export default function HowToReachPage() {
  return (
    <>
      <section className="compact-hero">
        <div className="kicker" data-reveal="eyebrow">How to Reach</div>
        <h1 data-reveal="heading">Getting to <em>Rosary Nest.</em></h1>
        <p className="subhead" data-reveal="body">Munnar is a journey. We hope it&#39;s part of the pleasure.</p>
      </section>

      <section className="intro-block">
        <p data-reveal="body">
          Yes, it takes time. Roughly four hours from the airport, sometimes longer if the road has
          opinions of its own. We have come to think this is part of the point — by the time you
          arrive, the city is several mountains behind you.
        </p>
      </section>

      <section className="route" data-reveal-group>
        <div className="ill" data-reveal="fade">
          <svg viewBox="0 0 120 120" fill="none" stroke="#2D3F2F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 90 L 60 50 L 100 50 L 80 80 Z" />
            <path d="M60 50 L 75 30 L 88 50" />
            <path d="M20 90 L 100 90" />
            <path d="M30 100 L 90 100" strokeDasharray="2 3" opacity="0.5" />
          </svg>
        </div>
        <div>
          <h3 data-reveal="heading">i. By air</h3>
          <div className="title" data-reveal="eyebrow">From Cochin Airport <em>(COK)</em></div>
          <p data-reveal="body" style={{ "--reveal-i": 0 } as React.CSSProperties}>
            The nearest airport is Cochin (COK), about 130 km from the property. The drive takes
            around four hours, through tea plantations, winding ghats, and one stretch of switchbacks
            that most guests photograph from the back seat.
          </p>
          <p className="sub" data-reveal="fade" style={{ "--reveal-i": 1 } as React.CSSProperties}>
            <strong>We can arrange a car</strong> for ₹6,500 each way — driven by Kurian, who has done
            this drive for us since 2017 and will stop where you&#39;d like him to. Let us know when
            you book.
          </p>
        </div>
      </section>

      <section className="route" data-reveal-group>
        <div className="ill" data-reveal="fade">
          <svg viewBox="0 0 120 120" fill="none" stroke="#2D3F2F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="20" y="40" width="80" height="40" />
            <rect x="28" y="50" width="20" height="14" />
            <rect x="56" y="50" width="20" height="14" />
            <rect x="84" y="50" width="10" height="14" />
            <circle cx="36" cy="86" r="5" /><circle cx="84" cy="86" r="5" />
            <path d="M14 92 L 106 92" strokeDasharray="2 3" />
          </svg>
        </div>
        <div>
          <h3 data-reveal="heading">ii. By train</h3>
          <div className="title" data-reveal="eyebrow">From Ernakulam <em>(Cochin) station</em></div>
          <p data-reveal="body" style={{ "--reveal-i": 0 } as React.CSSProperties}>
            The nearest railway station is Ernakulam, also 130 km away. Most overnight trains from
            Chennai, Bangalore, and Mumbai stop here. From the station, the drive up is the same four
            hours — same road, same view, same recommended driver.
          </p>
          <p className="sub" data-reveal="fade" style={{ "--reveal-i": 1 } as React.CSSProperties}>
            <strong>Trains we like:</strong> Trivandrum Mail from Chennai (arr. 06:00), Island Express
            from Bangalore (arr. 07:40). Either way, you&#39;ll be at the property before sunset.
          </p>
        </div>
      </section>

      <section className="route" data-reveal-group>
        <div className="ill" data-reveal="fade">
          <svg viewBox="0 0 120 120" fill="none" stroke="#2D3F2F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 100 Q 40 75 60 80 T 100 30" strokeWidth="1.5" />
            <path d="M20 100 Q 40 75 60 80 T 100 30" strokeDasharray="1 4" stroke="#A8674A" />
            <circle cx="100" cy="30" r="3" fill="#A8674A" stroke="none" />
            <line x1="20" y1="100" x2="20" y2="110" />
            <line x1="16" y1="106" x2="24" y2="106" />
          </svg>
        </div>
        <div>
          <h3 data-reveal="heading">iii. By road</h3>
          <div className="title" data-reveal="eyebrow">From wherever <em>you happen to be.</em></div>
          <p data-reveal="body" style={{ "--reveal-i": 0 } as React.CSSProperties}>
            From <strong className="u-forest-strong">Bangalore</strong> — seven hours via Salem and
            Theni. From <strong className="u-forest-strong">Madurai</strong> — four hours through the
            eastern ghats, the prettiest of the three. From <strong className="u-forest-strong">Cochin</strong> — four hours, same as the train.
          </p>
          <p className="sub" data-reveal="fade" style={{ "--reveal-i": 1 } as React.CSSProperties}>
            <strong>If you&#39;re driving yourself,</strong> the road is good until the last three
            kilometres. Below the last bend, you&#39;ll see our signpost, which is small. We can talk
            you in by phone if you&#39;d prefer.
          </p>
        </div>
      </section>

      <section className="tips" data-reveal-group>
        <h3 data-reveal="heading">A few practical notes</h3>
        <div className="item" data-reveal="fade" style={{ "--reveal-i": 0 } as React.CSSProperties}>
          <div className="h">On driving in monsoon</div>
          <p>
            Between mid-June and early September the road is wet, and the last three kilometres can
            be slippery in the late afternoon. If you&#39;re driving yourself, leave Cochin before
            lunch. If we&#39;re driving you, we&#39;ll plan around the weather and tell you honestly
            if we don&#39;t think the day is safe.
          </p>
        </div>
        <div className="item" data-reveal="fade" style={{ "--reveal-i": 1 } as React.CSSProperties}>
          <div className="h">On late arrivals</div>
          <p>
            The gate isn&#39;t locked, but the last cottages stop having visible light around ten. If
            your flight is delayed, write to us — we&#39;ll keep the kitchen open and someone will come
            down to walk you up the last stretch with a lantern.
          </p>
        </div>
        <div className="item" data-reveal="fade" style={{ "--reveal-i": 2 } as React.CSSProperties}>
          <div className="h">On luggage <em>and the last stretch</em></div>
          <p>
            The road ends sixty metres short of the upper veranda; from there it&#39;s a soft footpath
            under cardamom. We carry bags. You can carry your own, of course, but you don&#39;t need to.
          </p>
        </div>
      </section>

      <section className="cta-strip">
        <p className="line" data-reveal="heading">Ready to plan?</p>
        <Link className="quiet-link" href="/book">Check availability →</Link>
      </section>
    </>
  );
}
