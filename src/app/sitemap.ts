import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/deployment";
import { guides } from "@/content/guides";
import { services } from "@/content/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services/",
    ...services.map((s) => `/services/${s.slug}/`),
    "/about/",
    "/your-home/",
    ...guides.map((g) => `/your-home/${g.slug}/`),
    "/contact/",
    "/privacy/",
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
