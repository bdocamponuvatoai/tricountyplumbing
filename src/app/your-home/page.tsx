import { CallToAction } from "@/components/sections/CallToAction";
import { GuideCards } from "@/components/sections/GuideCards";
import { PageHero } from "@/components/sections/PageHero";
import { HomeChecklist } from "@/components/your-home/HomeChecklist";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Homeowner guides",
  path: "/your-home/",
  description:
    "Practical starting points for your next plumbing conversation, from noticing a change to planning an upgrade.",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Homeowner guides"
        title="A little knowledge."
        tone="A clearer next step."
        lead="Practical starting points for your next plumbing conversation, from noticing a change to planning an upgrade."
      />
      <div className="wrap guides-grid">
        <GuideCards headingLevel={2} />
      </div>
      <div className="section">
        <div className="wrap">
          <HomeChecklist />
        </div>
      </div>
      <CallToAction />
    </>
  );
}
