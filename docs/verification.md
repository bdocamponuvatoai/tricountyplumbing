# Verification record

## November 12, 2026: layout redesign (v2.0.0)

The site was redesigned on purpose, so this round checks quality, behaviour and that nothing was
lost. It is not a pixel-parity check against the old design. The previous build was kept as the
baseline for behaviour and performance comparisons.

### Build and code checks

- `npm run build`: passes (Next.js 16.4.6, Turbopack, 18 static pages + robots + sitemap).
  `postbuild` flattened 13 nested prefetch files, the known Windows export bug.
- `npm run check`: typecheck, ESLint (0 errors, 0 warnings) and Prettier all pass.
- `npm audit --omit=dev`: 0 vulnerabilities. The full tree reports 7 moderate advisories, all from
  one `minimatch` denial-of-service advisory reached through `typescript-eslint` (lint tooling,
  never shipped). Not force-fixed.

### Layout

Every route plus a `?service=` preset was captured full-page at 1600, 1280, 1024, 768, 390 and
320 px, with the system Chrome driven by playwright-core: no horizontal overflow, no console
errors, no failed requests. The only 4xx is the intentional `/nope/` 404 test page. A 28 px
overflow at 320 px (the finder button) was found and fixed during this pass. The interactive
states were also captured and reviewed: open mobile menu, planner errors, review step, finder
selection, FAQ open, and the keyboard focus ring.

### Behaviour (scripted, compared with the previous build)

Identical to the previous build:

- validation messages and focus on the first invalid field;
- step-heading focus;
- the urgent-timing note;
- the exact `sms:` href and the clipboard text, byte for byte;
- the download filename;
- Back and Edit keeping every value and the chosen service;
- finder → planner presets, including the pre-filled concern;
- the checklist progress text;
- FAQ expansion.

Intentional changes:

- nav labels: “Our approach” → “About”, “For your home” → “Guides”;
- the mobile menu now also closes when the window is resized to desktop;
- finder links encode spaces as `+`, which decodes to the same preset.

Navigation: client-side link clicks keep JS state; titles and `aria-current` update. Hash links
land 72 px below the top, clear of the sticky header. Back works. 0 4xx responses and 0 console
errors or hydration warnings, against 80 prefetch 404s and their console errors in the previous
build.

### Accessibility

axe-core 4 (WCAG 2.0/2.1/2.2 A + AA and best-practice rules) on 9 routes at 1280 and 390 px:
0 violations. One “label in name” issue on the logo link was found and fixed. Text over photos
uses scrims; axe cannot measure contrast over images, so those regions were reviewed by eye.

### Head and SEO

Every page has an absolute title, a description, a canonical URL, Open Graph tags (with
`/og.jpg`), `theme-color`, an SVG icon and `data-scroll-behavior="smooth"`. The home page has
`Plumber` JSON-LD. While `SITE_INDEXABLE` is unset, pages carry `noindex, nofollow` and
`robots.txt` disallows everything. The sitemap lists 13 URLs. Canonical URLs use `localhost`
until `SITE_URL` is set.

### Lighthouse

Lighthouse 13.6.0, mobile preset (simulated throttling), Chrome 157, 3 runs per page. Local
static build served by `serve@14` with compression. These are not live-URL numbers.

| Page              | Build    | Performance | Accessibility | Best practices | LCP         | CLS   | Page weight |
| ----------------- | -------- | ----------- | ------------- | -------------- | ----------- | ----- | ----------- |
| Home              | previous | 73–80       | 96            | 96             | 5.27–5.49 s | 0.003 | 1,017 KB    |
| Home              | new      | 96          | 100           | 100            | 2.76–2.79 s | 0     | 347 KB      |
| Contact           | previous | 97–100      | 96            | 100            | 0.76–0.80 s | 0.001 | 540 KB      |
| Contact           | new      | 99–100      | 100           | 100            | 0.76 s      | 0     | 202 KB      |
| Service (repairs) | new      | 97          | 100           | 100            | 2.51–2.56 s | 0     | 263 KB      |

SEO scores are 66–69 only because the preview is deliberately `noindex`. Main savings: images
went from one 1536 px file per photo to responsive variants (the hero is 45 KB on phones,
previously 214 KB), and fonts went from 4 × 96 KB TTF to one ~23 KB variable WOFF2.

The home page’s remaining LCP time is the hero photo sharing simulated slow-4G bandwidth with
the Next.js runtime (~150 KB of JavaScript). An `experimental.inlineCss` trial made no difference
to LCP (3.07 s) and slowed FCP, so it was not kept.

### Not covered

- Real iOS and Android devices: only Chrome desktop and Chrome mobile emulation were used.
  Safari and Firefox were not tested.
- The live URL: the site has not been deployed in this round.
- Actually sending a text message or placing a call: no external message or call was made.

## Earlier rounds

The original ChatGPT-built preview was verified in the managed preview in November 2026 (13
routes at 320 px, menu, explorer, finder, planner, SMS URL, clipboard and download), including
the homeowner-conversation photo refresh on November 11.
