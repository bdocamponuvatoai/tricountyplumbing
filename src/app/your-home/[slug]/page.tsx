import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CallToAction } from "@/components/sections/CallToAction";
import { GuideCards } from "@/components/sections/GuideCards";
import { ButtonLink, CallButton } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { getGuide, guides } from "@/content/guides";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/your-home/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    path: `/your-home/${guide.slug}/`,
    description: guide.description,
  });
}

export default async function GuidePage({ params }: PageProps<"/your-home/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const more = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <article>
        <header className="wrap article-hero">
          <Link className="back-link" href="/your-home/">
            <ChevronLeft aria-hidden="true" />
            All guides
          </Link>
          <p className="eyebrow">{`${guide.category} · ${guide.time}`}</p>
          <h1 className="title-1">{guide.title}</h1>
          <p className="lead">{guide.description}</p>
        </header>

        <div className="wrap">
          <Photo
            image={guide.image}
            alt={`Illustration for ${guide.category.toLowerCase()}`}
            className="wide-photo article-photo"
            sizes="(min-width: 1280px) 1200px, 100vw"
            eager
          />
        </div>

        <div className="article-body">
          {guide.sections.map((s, i) => (
            <section key={s.heading}>
              <span className="step-number">{`0${i + 1}`}</span>
              <div>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            </section>
          ))}
          <p className="article-note">
            General planning guidance. Your home’s needs and the work involved should be assessed
            and confirmed directly with a plumbing professional.
          </p>
          <div className="button-row">
            <ButtonLink href="/contact/" size="lg">
              Put your details together
            </ButtonLink>
            <CallButton variant="secondary" size="lg" />
          </div>
        </div>
      </article>

      <section className="section section-alt" aria-labelledby="more-guides-title">
        <div className="wrap">
          <p className="eyebrow">Keep reading</p>
          <h2 className="title-2" id="more-guides-title">
            More homeowner guides.
          </h2>
          <GuideCards items={more} />
        </div>
      </section>

      <CallToAction />
    </>
  );
}
