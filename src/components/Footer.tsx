import Link from "next/link";
import { getSettings } from "@/lib/content";

export async function Footer() {
  const settings = await getSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="logo-mark">{settings.site_name ?? "RosaryNest"}</div>
          <div className="tagline">{settings.tagline}</div>
        </div>
        <div>
          <h3>Visit</h3>
          <ul>
            <li><Link href="/the-land">The Land</Link></li>
            <li><Link href="/cottages">Cottages</Link></li>
            <li><Link href="/experiences">Experiences</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>
        <div>
          <h3>Stay</h3>
          <ul>
            <li><Link href="/book">Check availability</Link></li>
            <li><Link href="/plan-your-stay">Plan your stay</Link></li>
            <li><Link href="/plan-your-stay/how-to-reach">Getting here</Link></li>
            <li><Link href="/plan-your-stay/best-time">Best time to visit</Link></li>
            <li><Link href="/plan-your-stay/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>{settings.address_line1}, {settings.address_line2}</li>
            <li><a href={`tel:${settings.phone}`}>{settings.phone}</a></li>
            <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
            <li><Link href="/contact">Write to us →</Link></li>
          </ul>
        </div>
      </div>
      <div className="legal">
        <div>© {settings.site_name ?? "RosaryNest"} {year} · All rights reserved</div>
        <div>
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/house-rules">House rules</Link>
        </div>
      </div>
    </footer>
  );
}
