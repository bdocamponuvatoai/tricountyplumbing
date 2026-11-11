import { ApproachSection } from "@/components/home/ApproachSection";
import { HomeHero } from "@/components/home/HomeHero";
import { ServiceBento } from "@/components/home/ServiceBento";
import { CallToAction } from "@/components/sections/CallToAction";
import { FaqSection } from "@/components/sections/FaqSection";
import { GuideCards } from "@/components/sections/GuideCards";
import { LocalBand } from "@/components/sections/LocalBand";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServiceFinder } from "@/components/sections/ServiceFinder";
import { JsonLd } from "@/components/seo/JsonLd";
import { TextLink } from "@/components/ui/ButtonLink";
import { business } from "@/config/site";
import { siteUrl } from "@/config/deployment";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: `${business.name} | Residential Plumbing in Tracy, CA`,
  path: "/",
});

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: business.name,
  url: `${siteUrl}/`,
  image: `${siteUrl}/og.jpg`,
  telephone: business.tel,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.city,
    addressRegion: business.region,
    addressCountry: "US",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusiness} />
      <HomeHero />

      <section className="section section-alt" aria-labelledby="services-title">
        <div className="wrap">
          <SectionHeader
            id="services-title"
            eyebrow="Services"
            title="Big part of your home."
            tone="Little reason to worry."
            lead="From the tap you turn each morning to the fixtures that finish a room."
            action={<TextLink href="/services/">See all services</TextLink>}
          />
          <ServiceBento />
        </div>
      </section>

      <ApproachSection />
      <ServiceFinder />
      <LocalBand />

      <section className="section" aria-labelledby="guides-title">
        <div className="wrap">
          <SectionHeader
            id="guides-title"
            eyebrow="Homeowner guides"
            title="A little know‑how helps."
            action={<TextLink href="/your-home/">All guides</TextLink>}
          />
          <GuideCards carousel />
        </div>
      </section>

      <FaqSection />
      <CallToAction />
    </>
  );
}
