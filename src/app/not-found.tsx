import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getSettings } from "@/lib/content";

// Next.js already injects a noindex robots tag for not-found responses on
// its own — this only needs to add a proper title.
export const metadata: Metadata = {
  title: "Page not found — RosaryNest",
};

// Next.js renders this for any unmatched route. It sits outside the (site)
// route group's layout, so it brings its own Header/Footer rather than
// inheriting them.
export default async function NotFound() {
  const settings = await getSettings();

  return (
    <>
      <ScrollReveal />
      <Header logoUrl={settings.logo_url || "/images/RosaryNest-animated1.svg"} />
      <main>
        <div className="not-found">
          <p className="nf-num" data-reveal="heading">
            4<em>0</em>4
          </p>
          <p className="nf-line" data-reveal="fade">This path doesn&#39;t lead anywhere.</p>
          <p className="nf-body page-404" data-reveal="body">
            The page you&#39;re looking for may have moved, or the link might simply be old.
            Here&#39;s where you can pick the walk back up.
          </p>
          <nav className="nf-links" data-reveal="fade">
            <Link href="/">Home</Link>
            <Link href="/cottages">Cottages</Link>
            <Link href="/experiences">Experiences</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
