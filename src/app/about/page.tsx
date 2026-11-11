import { CallToAction } from "@/components/sections/CallToAction";
import { LocalBand } from "@/components/sections/LocalBand";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/ButtonLink";
import { Photo } from "@/components/ui/Photo";
import { business } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  path: "/about/",
  description: `${business.name} is a residential plumbing business based in ${business.location}, led by ${business.owner}.`,
});

const values = [
  {
    title: "Your home comes first.",
    text: "Start with how you use the space and what needs attention.",
  },
  {
    title: "Clarity before the next step.",
    text: "Talk through the scope, timing, and visit charges directly.",
  },
  {
    title: "Everyday work matters.",
    text: "Make room for repairs, practical upgrades, and ongoing care.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Tri-County"
        title="Plumbing is our work."
        tone="Your home is the point."
        lead={`${business.name} is a residential plumbing business based in ${business.location}, led by ${business.owner}.`}
      />

      <div className="wrap">
        <Photo
          image="craft"
          alt="Illustration of a plumbing professional checking a kitchen faucet"
          className="wide-photo"
          sizes="(min-width: 1280px) 1200px, 100vw"
          eager
        />
      </div>

      <section className="section statement" aria-label="The small things matter">
        <div className="wrap">
          <p className="eyebrow">The small things matter</p>
          <p className="statement-text reveal">
            A faucet that works the way it should.{" "}
            <span className="tone">A fixture that fits the way you live.</span> One less thing on
            your list.
          </p>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="story-title">
        <div className="wrap detail-columns">
          <div>
            <p className="eyebrow">A familiar kind of work</p>
            <h2 className="title-2" id="story-title">
              For the place you call home.
            </h2>
          </div>
          <div className="prose">
            <p>
              Our work centers on the everyday plumbing needs of homeowners: repairs, installations,
              and general maintenance. The things that keep a home running, and the improvements
              that make it your own.
            </p>
            <p>
              Whether you have a specific repair in mind or a question about your next upgrade, the
              first step is straightforward. Tell us what’s happening, discuss the details, and
              confirm a plan that fits the work.
            </p>
            <TextLink href="/contact/">Start with a conversation</TextLink>
          </div>
        </div>
        <ul className="wrap values">
          {values.map((v, i) => (
            <li key={v.title} className="reveal">
              <span className="step-number">{`0${i + 1}`}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <LocalBand
        eyebrow={business.location}
        title="Close to home."
        text={`Based in the ${business.city} area. Call with your city or ZIP code to confirm service availability for your home.`}
      />
      <CallToAction />
    </>
  );
}
