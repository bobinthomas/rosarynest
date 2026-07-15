import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

// Every page reads from D1 at request time — nothing here is safe to
// prerender against the build-time D1 emulation (and it should reflect
// admin edits immediately in production anyway).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "RosaryNest — where stillness stays",
    description:
      "A quiet retreat in the hills of Munnar. Four cottages, a forest, and a lake — tucked away from the town.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Trimmed to weights actually used in the CSS (verified via grep):
            no font-weight:600 exists anywhere, and every italic <em> rule
            explicitly resets to weight 300, so 400/500 italic were never
            rendered. This is the same set of glyphs, just fewer font files.
            Google Sans replaces Inter for --sans — it only ships weights
            400/500/600/700, so any font-weight:300 in the CSS renders at 400
            (no lighter face exists). --mono stays on JetBrains Mono. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Google+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
