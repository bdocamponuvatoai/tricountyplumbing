import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { CallToAction } from "@/components/sections/CallToAction";
import { ButtonLink, CallButton, TextLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { plannerHref } from "@/content/finder";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    path: `/services/${service.slug}/`,
    description: service.description,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="wrap detail-hero">
        <div className="detail-hero-copy">
          <Link className="back-link" href="/services/">
            <ChevronLeft aria-hidden="true" />
            All services
          </Link>
          <p className="eyebrow">{service.title}</p>
          <h1 className="title-1">{service.short}</h1>
          <p className="lead">{service.intro}</p>
          <div className="button-row">
            <CallButton size="lg" />
            <ButtonLink href={plannerHref(service.slug)} variant="secondary" size="lg">
              Plan this service
            </ButtonLink>
          </div>
        </div>
        <Photo
          image={service.image}
          alt={service.alt}
          className="detail-hero-photo"
          sizes="(min-width: 1080px) 600px, 100vw"
          eager
        />
      </section>

      <section className="section" aria-labelledby="scope-title">
        <div className="wrap detail-columns">
          <div>
            <p className="eyebrow">A good place to start</p>
            <h2 className="title-2" id="scope-title">
              The details we can discuss.
            </h2>
            <p className="body-lg">
              Every home and every job is different. Call to confirm the work involved,
              availability, and any assessment or visit charges.
            </p>
          </div>
          <ul className="scope-grid">
            {service.items.map((item) => (
              <li key={item} className="reveal">
                <span className="icon-badge">
                  <Check aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="prepare-title">
        <div className="wrap detail-columns">
          <div>
            <p className="eyebrow">Before you call</p>
            <h2 className="title-2" id="prepare-title">
              A few helpful details.
            </h2>
            <p className="body-lg">
              You don’t need all the answers. These are useful starting points for the conversation.
            </p>
            <TextLink href={plannerHref(service.slug)}>Build your service summary</TextLink>
          </div>
          <ol className="question-list">
            {service.prepare.map((q, i) => (
              <li key={q} className="reveal">
                <span className="step-number">{`0${i + 1}`}</span>
                {q}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="related-title">
        <div className="wrap">
          <p className="eyebrow">More ways to look after home</p>
          <h2 className="title-2" id="related-title">
            Something else in mind?
          </h2>
          <ul className="related-grid">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="related-card">
                  <span className="icon-badge icon-badge-lg">
                    <ServiceIcon name={s.icon} size={24} />
                  </span>
                  <span className="related-title">{s.title}</span>
                  <span className="related-text">{s.short}</span>
                  <ChevronRight aria-hidden="true" className="related-arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
