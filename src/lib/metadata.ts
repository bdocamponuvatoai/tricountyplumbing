import type { Metadata } from "next";
import { business } from "@/config/site";
import { ogImage } from "@/content/images";

const DEFAULT_DESCRIPTION =
  "Residential plumbing repairs, fixture installations, and home plumbing care in Tracy, California. Talk with Tri-County Plumbing about your home.";

/**
 * Per-page metadata: absolute title, description, canonical and Open Graph.
 * `path` is the route with its trailing slash, e.g. "/services/".
 */
export function pageMetadata({
  title,
  path,
  description = DEFAULT_DESCRIPTION,
}: {
  title: string;
  path: string;
  description?: string;
}): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${business.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: business.name,
      title: fullTitle,
      description,
      url: path,
      images: [
        { ...ogImage, alt: "Illustration of a sunlit kitchen with a brushed nickel faucet" },
      ],
    },
  };
}
