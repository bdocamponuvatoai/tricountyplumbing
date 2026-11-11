import { PageHero } from "@/components/sections/PageHero";
import { business, telHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  path: "/privacy/",
  description: "How this website handles the details you enter in the service planner.",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Your information"
        title="Privacy, in plain language."
        lead="How this design preview handles the details you enter."
      />
      <article className="wrap prose privacy">
        <h2>The service planner</h2>
        <p>
          Your entries are held in your browser’s page memory. They are not submitted to Tri-County
          Plumbing or stored in a customer database by this website. The site does not save these
          entries in cookies or local storage. Reloading resets the planner; your browser may
          separately retain history or offer autofill.
        </p>
        <h2>Choosing to share</h2>
        <p>
          “Open text message” passes your summary to your device’s messaging app if supported. You
          review and send it there. “Copy summary” copies it to your clipboard, and “Download
          summary” saves a text file on your device. Your device and messaging provider handle those
          actions under their own settings and policies.
        </p>
        <h2>Calls and appointments</h2>
        <p>
          Phone links open your calling application. This website cannot confirm calls, message
          delivery, bookings, or availability. Confirm all service arrangements directly with
          Tri-County Plumbing.
        </p>
        <h2>Website hosting</h2>
        <p>
          This is a static website. The hosting provider handles access and technical logs under its
          own policies. This site adds no advertising trackers or analytics scripts.
        </p>
        <h2>Questions</h2>
        <p>
          Contact Tri-County Plumbing at <a href={telHref}>{business.phone}</a> for business or
          service questions.
        </p>
        <p className="muted">Preview information updated November 2026.</p>
      </article>
    </>
  );
}
