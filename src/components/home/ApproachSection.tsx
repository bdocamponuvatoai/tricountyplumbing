import { getImageProps } from "next/image";
import { TextLink } from "@/components/ui/ButtonLink";
import { business } from "@/config/site";
import { images } from "@/content/images";

const steps = [
  {
    title: "Tell us what’s happening.",
    text: "A repair, a replacement, or something you’re not sure about. Start with what you’ve noticed.",
  },
  {
    title: "Talk through the details.",
    text: "Your location, the work involved, availability, and any visit charges, directly by phone.",
  },
  {
    title: "Agree on the next step.",
    text: "Confirm the scope and timing before any appointment or work begins.",
  },
];

const ALT = "Illustration of a plumber and homeowner discussing a kitchen faucet in a sunlit home";
const SIZES_WIDE = "(min-width: 1080px) 560px, 50vw";
const SIZES_PHONE = "100vw";

/** Art-directed photo: square on desktop, portrait crop on phones. */
function ConversationPhoto() {
  const wide = getImageProps({
    src: images.conversation.src,
    width: images.conversation.width,
    height: images.conversation.height,
    alt: ALT,
    sizes: SIZES_WIDE,
  }).props;
  const phone = getImageProps({
    src: images.conversationPortrait.src,
    width: images.conversationPortrait.width,
    height: images.conversationPortrait.height,
    alt: ALT,
    sizes: SIZES_PHONE,
  }).props;
  return (
    <figure className="photo approach-photo">
      <picture>
        <source media="(max-width: 734px)" srcSet={phone.srcSet} sizes={SIZES_PHONE} />
        <source media="(min-width: 735px)" srcSet={wide.srcSet} sizes={SIZES_WIDE} />
        <img {...wide} alt={ALT} loading="lazy" />
      </picture>
      <figcaption className="photo-label">AI illustration</figcaption>
    </figure>
  );
}

export function ApproachSection() {
  return (
    <section className="section" aria-labelledby="approach-title">
      <div className="wrap split">
        <div className="reveal">
          <ConversationPhoto />
        </div>
        <div className="approach-copy">
          <p className="eyebrow">Our approach</p>
          <h2 className="title-2" id="approach-title">
            A home is personal. <span className="tone">Plumbing should feel that way, too.</span>
          </h2>
          <p className="body-lg">
            {`${business.name} is ${business.owner}’s residential plumbing business, based in ${business.location}. Repairs, installations, and general maintenance are at the heart of what we do.`}
          </p>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-number">{`0${i + 1}`}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <TextLink href="/about/">Get to know Tri-County</TextLink>
        </div>
      </div>
    </section>
  );
}
