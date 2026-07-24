import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StructuredData } from "@/components/StructuredData";
import { getSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  const lodgingBusiness = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: settings.site_name || "RosaryNest",
    description: settings.tagline,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    image: `${SITE_URL}/images/red-cottage-front-view.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address_line1,
      addressLocality: "Munnar",
      addressRegion: "Kerala",
      postalCode: "685612",
      addressCountry: "IN",
    },
    geo: settings.latitude && settings.longitude
      ? {
          "@type": "GeoCoordinates",
          latitude: settings.latitude,
          longitude: settings.longitude,
        }
      : undefined,
  };

  return (
    <>
      <StructuredData data={lodgingBusiness} />
      <ScrollReveal />
      <Header
        logoUrl={settings.logo_url || "/images/RosaryNest-animated1.svg"}
        bookingUrl={settings.booking_url || "/book"}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
