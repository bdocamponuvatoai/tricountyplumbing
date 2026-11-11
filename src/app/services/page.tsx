import { Check } from "lucide-react";
import { CallToAction } from "@/components/sections/CallToAction";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { plannerHref } from "@/content/finder";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Residential plumbing services",
  path: "/services/",
  description:
    "Plumbing repairs, drains and toilets, fixture installations, and home plumbing care in Tracy, California.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everyday essentials."
        tone="Thoughtfully handled."
        lead="Residential plumbing repairs, installations, and ongoing care. Find your starting point, then talk through what your home needs."
      >
        <nav className="chips" aria-label="Jump to a service">
          {services.map((s) => (
            <a key={s.slug} className="chip" href={`#${s.slug}`}>
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="wrap service-list">
        {services.map((s, i) => (
          <article key={s.slug} id={s.slug} className="service-item reveal">
            <Photo
              image={s.image}
              alt={s.alt}
              className="service-item-photo"
              sizes="(min-width: 1080px) 680px, 100vw"
              eager={i === 0}
            />
            <div className="service-item-copy">
              <p className="eyebrow">{s.number}</p>
              <h2 className="title-3">{s.title}</h2>
              <p className="body-lg">{s.description}</p>
              <ul className="check-list">
                {s.items.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="link-row">
                <TextLink href={`/services/${s.slug}/`}>Learn more</TextLink>
                <TextLink href={plannerHref(s.slug)}>Plan this service</TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>

      <FaqSection />
      <CallToAction />
    </>
  );
}
