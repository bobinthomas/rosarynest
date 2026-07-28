import type { Metadata } from "next";
import { Cormorant_Garamond, Google_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

// Self-hosted via next/font (replaces the fonts.googleapis.com <link>, which
// was a render-blocking cross-origin request). Weights/styles match what
// was requested before — see the comment above the old <link> tag in git
// history for why these specific ones were chosen.
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});
const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-google-sans",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorantGaramond.variable} ${googleSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
