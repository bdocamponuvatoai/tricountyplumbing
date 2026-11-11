import { CallButton } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { business } from "@/config/site";

/** Full-bleed photo band with the Tracy location message. */
export function LocalBand({
  eyebrow = `Rooted in ${business.city}`,
  title = "A little closer to home.",
  text = `Based in ${business.location}. Call with your city or ZIP code to talk through your plumbing needs and confirm availability.`,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="section local-section" aria-labelledby="local-title">
      <div className="wrap">
        <div className="local reveal">
          <Photo
            image="home"
            alt="Illustration of a Northern California neighborhood home"
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
          <div className="local-content">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="title-2" id="local-title">
              {title}
            </h2>
            <p>{text}</p>
            <CallButton variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
