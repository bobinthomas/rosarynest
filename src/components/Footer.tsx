import Link from "next/link";
import { getSettings } from "@/lib/content";
import { SiteImage } from "@/components/SiteImage";
import { FacebookIcon, InstagramIcon, TripAdvisorIcon, YouTubeIcon } from "@/components/SocialIcons";
import { telHref } from "@/lib/phone";

const socialLinks = [
  { key: "instagram_url", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook_url", label: "Facebook", Icon: FacebookIcon },
  { key: "youtube_url", label: "YouTube", Icon: YouTubeIcon },
  { key: "tripadvisor_url", label: "TripAdvisor", Icon: TripAdvisorIcon },
] as const;

export async function Footer() {
  const settings = await getSettings();
  const year = new Date().getFullYear();
  const socials = socialLinks.filter((s) => settings[s.key]);

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-logo">
            <SiteImage src={settings.logo_url || "/images/RosaryNest-animated1.svg"} alt={settings.site_name ?? "RosaryNest"} />
          </Link>
          <div className="tagline">{settings.tagline}</div>
          {socials.length ? (
            <div className="footer-social">
              {socials.map(({ key, label, Icon }) => (
                <a key={key} href={settings[key]} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          ) : null}
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
            <li><a href={telHref(settings.phone)}>{settings.phone}</a></li>
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
