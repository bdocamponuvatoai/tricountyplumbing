# Tri-County Plumbing

Website for Tri-County Plumbing, Ronald Harang’s residential plumbing business in Tracy,
California. Built with **Next.js 16 (App Router), React 19, TypeScript and hand-written CSS**,
exported as a fully static site.

> **Status: design preview.** The identity is a proposal, the photos are AI-generated
> illustrations, and search engines are blocked until the owner approves a launch. See
> [Before launch](#before-launch).

## Getting started

Requires Node.js 20.9 or later (`.nvmrc` pins the current LTS, 24).

```bash
npm ci
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export to out/
npm run preview    # serve out/ on http://localhost:3000
```

## Scripts

| Script                 | What it does                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload.                                                          |
| `npm run build`        | Production static export to `out/`, then `postbuild`.                                        |
| `postbuild`            | `scripts/fix-export-segments.mjs`: flattens prefetch files (Windows export bug, see script). |
| `npm run preview`      | Serves `out/` with `serve@14` (via npx, not a dependency).                                   |
| `npm run images`       | Regenerates responsive photo variants and `og.jpg` from `src/assets/images/`.                |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules).                                         |
| `npm run typecheck`    | `next typegen` + `tsc --noEmit`.                                                             |
| `npm run format`       | Prettier, write.                                                                             |
| `npm run format:check` | Prettier, check only.                                                                        |
| `npm run check`        | typecheck + lint + format:check (what CI runs).                                              |

## Structure

```
src/
  app/                  routes (one folder per route), layout, not-found, icon, robots, sitemap
    services/[slug]/    service pages (generateStaticParams, dynamicParams = false)
    your-home/[slug]/   guide pages
  components/
    layout/             SiteHeader (menu), SiteFooter, MobileActionBar
    home/               HomeHero, ServiceBento, ApproachSection
    sections/           shared sections: PageHero, SectionHeader, ServiceFinder, LocalBand,
                        GuideCards, FaqSection, CallToAction
    contact/            ServicePlanner (3-step summary builder), PlannerFromQuery (?service= presets)
    your-home/          HomeChecklist
    ui/                 Brand, ButtonLink/CallButton/TextLink, SmartLink, Photo, ServiceIcon
    seo/                JsonLd
  config/
    site.ts             business facts + navigation (safe for client code)
    deployment.ts       SITE_URL / SITE_INDEXABLE (server only)
  content/              typed copy: services, guides, FAQ, finder, image registry
  lib/                  metadata builder, summary/SMS builder + validation, image loader, cx
  styles/               globals.css importing ordered partials (base, components, sections, pages)
  assets/
    fonts/              Manrope variable font (400–700), Latin subset, one WOFF2 (OFL licence alongside)
    images/             source photos (variants are generated into public/images/)
public/
  images/               generated responsive variants (committed)
  og.jpg                generated Open Graph card
scripts/                generate-images.mjs, fix-export-segments.mjs
```

## Routes

| Route                | Page                                                                            |
| -------------------- | ------------------------------------------------------------------------------- |
| `/`                  | Home                                                                            |
| `/services/`         | All services                                                                    |
| `/services/[slug]/`  | `plumbing-repairs`, `drains-and-toilets`, `fixture-installation`, `maintenance` |
| `/about/`            | About                                                                           |
| `/your-home/`        | Homeowner guides + checklist                                                    |
| `/your-home/[slug]/` | `before-your-visit`, `know-your-plumbing`, `planning-an-upgrade`                |
| `/contact/`          | Service planner (accepts `?service=<slug>&concern=<text>`)                      |
| `/privacy/`          | Privacy                                                                         |
| `404.html`           | Not found                                                                       |

## Design system

- **Tokens** live in `src/styles/base/tokens.css`: a neutral canvas (`--bg`, `--bg-alt`), one
  brand ink (`--brand`), one copper accent (`--accent`) and a fluid type scale. All text colours
  pass WCAG AA on both backgrounds; `--text-tone` (the grey second line of headlines) is for large
  text only.
- **Breakpoints:** phone ≤ 734px, tablet 735–1068px, desktop ≥ 1069px; the desktop nav appears at
  835px.
- **Headlines** are two-tone: `Title. <span class="tone">Second line.</span>`.
- **Actions:** one primary action per view. Calling is primary (`CallButton`), the planner is
  secondary. Phones get a floating call bar that slides in after the hero.
- **Motion** is CSS-only and progressive (scroll-driven reveals where supported); nothing animates
  under `prefers-reduced-motion`, and all content is visible without JavaScript.

## Conventions

- **Facts:** every business fact lives in `src/config/site.ts` and is sourced in
  `docs/content-provenance.md`. Do not add hours, prices, licences, reviews, ratings, service
  areas or years in business without written owner approval.
- **Photos:** every photo is AI-generated. Photos showing people carry a visible “AI
  illustration” label (`Photo` adds it automatically from the `people` flag in
  `src/content/images.ts`); the footer discloses the rest. To add one, drop the source into
  `src/assets/images/`, register it in `src/content/images.ts`, run `npm run images` and commit
  the output.
- **Server Components by default.** Client components only for real interactivity: the header
  menu, action bar, service finder, planner and checklist.
- **Links:** internal paths go through `next/link` (`SmartLink` does this automatically);
  `tel:`/`sms:` stay plain anchors.

## Configuration

Copy `.env.example` to `.env.local` for local overrides.

| Variable         | Default                                                                | Purpose                                                                                        |
| ---------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Canonical URLs, Open Graph, sitemap, robots. No trailing slash.                                |
| `SITE_INDEXABLE` | `false`                                                                | `true` allows indexing. The build fails if this is `true` while `SITE_URL` is still localhost. |

## Contact behaviour

Phone links open the visitor’s calling app. The service planner keeps entries in page memory
only. It does **not** send anything or book anything: visitors can open a prepared text message
in their own messaging app, copy the summary, or download it as a text file. There is no email
address, CRM, analytics or tracking.

## Before launch

- [ ] Owner confirms phone number, service scope and how they want to be contacted.
- [ ] Owner approves the identity, or supplies their own logo.
- [ ] Replace AI illustrations with real photos of the owner’s work, or get explicit approval to
      keep them (the labels and footer note stay either way).
- [ ] Decide whether the planner should deliver messages automatically; if so, add a real
      endpoint, spam protection, delivery monitoring and matching privacy copy.
- [ ] Remove “design preview” wording from the footer, privacy page and summary text.
- [ ] Set `SITE_URL` to the real domain and `SITE_INDEXABLE=true` in production.
- [ ] Run Lighthouse on the live URL and submit `sitemap.xml` in Google Search Console.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: `npm ci` →
`npm run check` → `npm run build`, then uploads `out/` as an artifact. Dependabot
(`.github/dependabot.yml`) opens weekly npm updates (Next/React grouped) and monthly
GitHub Actions updates.

## Hosting

The output in `out/` is plain static files and works on any host that serves directory index
files and uses `404.html` for missing pages.

**Vercel:** import the repository (framework preset: Next.js; the static export is detected
automatically). Set `SITE_INDEXABLE=false` for previews; for production set `SITE_URL` to the
real domain, and turn indexing on only after owner approval. `vercel.json` adds security headers
(nosniff, referrer policy, frame denial, permissions policy, HSTS) and long-lived caching for
`/images/`.

`.openai/hosting.json` is kept from the original ChatGPT Sites preview so that preview can still
be republished from `out/`. Delete it once the site moves to its permanent host.
