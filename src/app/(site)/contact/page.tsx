import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact — RosaryNest",
  description:
    "Reach RosaryNest by phone, email, or WhatsApp. We answer personally, usually the same day — for bookings, group stays, or anything you'd like to ask before you arrive.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSettings();
  const whatsappNumber = (settings.whatsapp ?? "").replace(/[^\d]/g, "");

  return (
    <>
      <section className="compact-hero">
        <div className="kicker" data-reveal="eyebrow">Contact</div>
        <h1 data-reveal="heading">We answer <em>personally.</em></h1>
        <p className="subhead" data-reveal="body">Email, call, or write — whichever you prefer. We usually respond the same day.</p>
      </section>

      <section className="contact-two-col">
        <div className="contact-direct" data-reveal="fade">
          <h2>Reach us directly</h2>
          <div className="channel">
            <label>Email</label>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
          <div className="channel">
            <label>Phone</label>
            <a href={`tel:${settings.phone}`}>{settings.phone}</a>
          </div>
          <div className="channel">
            <label>WhatsApp</label>
            <a href={`https://wa.me/${whatsappNumber}`}>{settings.whatsapp}</a>
          </div>
          <div className="channel">
            <label>Address</label>
            <div className="val">{settings.address_line1}</div>
            <div className="addr-extra">{settings.address_line2}</div>
          </div>
          <div className="hours">
            <strong>When we&#39;re at the desk</strong>
            <br />
            {settings.hours_note}
          </div>
        </div>

        <div data-reveal="fade">
          <ContactForm />
        </div>
      </section>

      <section className="map-block">
        <div className="head">
          <div className="kicker" data-reveal="eyebrow">Where to find us</div>
          <h2 data-reveal="heading">On the hill, <em>twenty minutes from town.</em></h2>
        </div>
        <div className="map-frame" data-reveal="image">
          <div className="pin">
            <div className="dot"></div>
            <div className="label">{settings.site_name}</div>
            <div className="coord">{settings.latitude}° N · {settings.longitude}° E</div>
          </div>
        </div>
        <div className="below">
          <p data-reveal="body">
            The property sits roughly twenty minutes by car from Munnar town, off the road to
            Vellathooval. The last three kilometres are slow on purpose. We&#39;ll send full
            directions when you book.
          </p>
          <Link className="quiet-link" href="/plan-your-stay/how-to-reach">Full directions →</Link>
        </div>
      </section>

      <section className="social-row">
        <div className="label">Elsewhere</div>
        <div className="links">
          <a href={settings.instagram_url || "#"}>Instagram</a>
          <a href={settings.facebook_url || "#"}>Facebook</a>
          <a href={settings.tripadvisor_url || "#"}>TripAdvisor</a>
        </div>
      </section>
    </>
  );
}
