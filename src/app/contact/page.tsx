import { Suspense } from "react";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import { PlannerFromQuery } from "@/components/contact/PlannerFromQuery";
import { ServicePlanner } from "@/components/contact/ServicePlanner";
import { business, telHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Plan your service",
  path: "/contact/",
  description:
    "Put your plumbing details in one place, then call or text Tri-County Plumbing in Tracy, California.",
});

export default function ContactPage() {
  return (
    <div className="wrap contact">
      <aside className="contact-aside">
        <p className="eyebrow">A conversation starts here</p>
        <h1 className="title-1">
          Your home. <span className="tone">Your next step.</span>
        </h1>
        <p className="lead">
          Tell us a little about what you need. We’ll help you put the details in one place.
        </p>

        <a className="call-card" href={telHref}>
          <span className="call-card-icon">
            <Phone aria-hidden="true" />
          </span>
          <span>
            <small>Prefer to talk?</small>
            <strong>{business.phone}</strong>
          </span>
          <ChevronRight aria-hidden="true" className="call-card-arrow" />
        </a>

        <p className="contact-location">
          <MapPin aria-hidden="true" />
          <span>
            {`Based in ${business.location}.`}
            <br />
            Call to confirm service at your address.
          </span>
        </p>

        <div className="note-card">
          <strong>Need prompt attention?</strong>
          <p>
            Call directly to discuss availability. This planner is not monitored and does not
            confirm an appointment.
          </p>
        </div>
      </aside>

      <Suspense fallback={<ServicePlanner />}>
        <PlannerFromQuery />
      </Suspense>
    </div>
  );
}
