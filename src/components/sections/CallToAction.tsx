import { ButtonLink, CallButton } from "@/components/ui/ButtonLink";

export function CallToAction() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap cta-inner reveal">
        <p className="eyebrow">A good place to start</p>
        <h2 className="title-2" id="cta-title">
          Let’s get your home back in its flow.
        </h2>
        <p className="lead">A repair, an upgrade, or a question. Tell us what’s on your mind.</p>
        <div className="button-row">
          <CallButton variant="light" size="lg" />
          <ButtonLink href="/contact/" variant="ghost-light" size="lg">
            Plan your service
          </ButtonLink>
        </div>
      </div>
      <svg className="cta-pipes" viewBox="0 0 500 300" fill="none" aria-hidden="true">
        <path
          d="M0 220h150c60 0 60-120 120-120h230M0 250h150c90 0 30-120 120-120h230M0 280h150c120 0 0-120 120-120h230"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </section>
  );
}
