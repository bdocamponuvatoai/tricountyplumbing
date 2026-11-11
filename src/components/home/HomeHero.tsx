import { MapPin, MessagesSquare, Wrench } from "lucide-react";
import { ButtonLink, CallButton } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { business } from "@/config/site";

const highlights = [
  {
    icon: MapPin,
    title: `Based in ${business.city}`,
    text: "Call with your city or ZIP code to confirm availability for your home.",
  },
  {
    icon: Wrench,
    title: "Residential plumbing",
    text: "Repairs, fixture installations, and general maintenance.",
  },
  {
    icon: MessagesSquare,
    title: "Clear before work starts",
    text: "Talk through scope, timing, and any visit charges first.",
  },
];

export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow">{`Residential plumbing · ${business.location}`}</p>
          <h1 className="display" id="hero-title">
            Good plumbing. <span className="tone">A better day.</span>
          </h1>
          <p className="lead">
            Repairs, thoughtful upgrades, and everyday care. Residential plumbing that keeps life
            moving.
          </p>
          <div className="button-row button-row-center">
            <CallButton size="lg" />
            <ButtonLink href="/contact/" variant="secondary" size="lg">
              Plan your service
            </ButtonLink>
          </div>
        </div>

        <Photo
          image="kitchen"
          alt="Illustration of a sunlit kitchen with an oak cabinet, stone counter, and brushed nickel faucet"
          className="hero-media"
          sizes="(min-width: 1280px) 1200px, 100vw"
          eager
        />

        <ul className="highlights" aria-label="At a glance">
          {highlights.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="icon-badge">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <p className="highlight-title">{title}</p>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
