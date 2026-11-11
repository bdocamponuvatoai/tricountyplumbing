import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { business } from "@/config/site";
import { isIndexable, siteUrl } from "@/config/deployment";
import "@/styles/globals.css";

// Manrope variable font (weights 400–700), subset to Latin: one ~23 KB file.
const manrope = localFont({
  src: "../assets/fonts/manrope-variable.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Residential Plumbing in Tracy, CA`,
    template: `%s | ${business.name}`,
  },
  description:
    "Residential plumbing repairs, fixture installations, and home plumbing care in Tracy, California. Talk with Tri-County Plumbing about your home.",
  applicationName: business.name,
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  // Only the phone links we write should be tappable.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
