import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="wrap not-found">
      <p className="eyebrow">404 · A small detour</p>
      <h1 className="display">
        This page isn’t <span className="tone">in the flow.</span>
      </h1>
      <p className="lead">Let’s get you back to something useful.</p>
      <div className="button-row button-row-center">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/services/" variant="secondary" size="lg">
          Explore services
        </ButtonLink>
      </div>
    </section>
  );
}
