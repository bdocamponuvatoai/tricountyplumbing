// Environment-driven deployment settings. Server-only: read at build time.

function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

/** Search engines may index the site only when explicitly enabled. */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && /localhost|127\.0\.0\.1/.test(siteUrl)) {
  throw new Error(
    "SITE_INDEXABLE=true but SITE_URL is not set. Set SITE_URL to the public domain before enabling indexing.",
  );
}
