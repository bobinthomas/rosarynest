"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteImage } from "@/components/SiteImage";

const leftLinks = [
  { href: "/the-land", label: "The Land" },
  { href: "/cottages", label: "Cottages" },
  { href: "/experiences", label: "Experiences" },
];

const rightLinks = [
  { href: "/journal", label: "Journal" },
  { href: "/the-family", label: "The Family" },
  { href: "/plan-your-stay", label: "Plan Your Stay" },
];

export function Header({ logoUrl }: { logoUrl: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // The header is transparent with light text by design, so it can sit on
  // top of the homepage's dark hero video. Every other page has a light
  // background, so it needs the solid/dark-text look from the start —
  // only the homepage keeps the transparent-until-scrolled look.
  useEffect(() => {
    if (!isHome) return;
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isSolid = !isHome || scrolled;

  return (
    <>
      <header className={`site-header${isSolid ? " is-solid" : ""}`}>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span className="nav-toggle-lines" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="nav-toggle-label">Menu</span>
        </button>

        <nav className="nav-left" aria-label="Primary left">
          {leftLinks.map((l) => (
            <Link key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link className="logo" href="/">
          <SiteImage src={logoUrl} alt="RosaryNest" priority />
        </Link>

        <nav className="nav-right" aria-label="Primary right">
          {rightLinks.map((l) => (
            <Link key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link className="reserve reserve-desktop" href="/book">
            Reserve
          </Link>
        </nav>

        <Link className="reserve reserve-header" href="/book">
          Reserve
        </Link>
      </header>

      <div id="mobile-nav" className={`mobile-nav${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-nav-backdrop" onClick={() => setOpen(false)} />
        <div className="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <button type="button" className="mobile-nav-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="mobile-nav-group">
            <ul className="mobile-nav-list">
              {leftLinks.map((l) => (
                <li key={l.href}>
                  <Link className="mobile-nav-link" href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mobile-nav-group">
            <ul className="mobile-nav-list">
              {rightLinks.map((l) => (
                <li key={l.href}>
                  <Link className="mobile-nav-link" href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link className="reserve mobile-nav-reserve" href="/book" onClick={() => setOpen(false)}>
            Reserve
          </Link>
        </div>
      </div>
    </>
  );
}
