# Asset prompts and files

Generated with the built-in image generation tool for this website. These are fictional illustrative scenes, not actual employees, homes served, or completed projects. PNG masters remain outside the source; optimized WebP files below are shipped with the site.

## src/assets/images/kitchen.webp

Use case: photorealistic-natural. Asset type: premium residential plumbing website hero, landscape 3:2. Create a genuine-looking architectural editorial photograph of a beautiful but attainable Northern California family kitchen. A brushed nickel single-handle gooseneck faucet and white undermount sink are the crisp foreground focus, on a warm pale stone countertop. Warm honey oak lower cabinets, soft white walls, window and leafy California garden beyond, subtle linen towel, a single glass. Midday directional natural sunlight with soft shadows and luminous warm whites. Composition: faucet and sink on right-center, generous architectural space and window across frame, carefully restrained, fine photographic texture, realistic reflections and fixture geometry. Camera: 35mm editorial photography, no extreme wide angle, premium magazine realism, no CGI. No people, no text, no logos, no watermark, no collage. This is illustrative brand imagery, not a real completed project.

## src/assets/images/home.webp

Use case: photorealistic-natural. Asset type: California residential plumbing brand local area image, landscape 3:2. Premium editorial real estate photography of an inviting modest contemporary Northern California suburban house in the Tracy region: warm ivory stucco, charcoal pitched roof, natural wood front door, tasteful drought-tolerant landscaping and one mature tree, a clean path, green planting, soft late afternoon sunlight. House fills most of frame, calm residential street edge, no luxury mansion, no people, no cars, no signs, no text, no logo, no watermark. Photographic detail, plausible architecture and shadows, subtle film texture, warm natural palette. This is a fictional illustrative home and is not a specific business address or customer's property.

## src/assets/images/craft.webp (originally craft-v2.webp)

Use case: photorealistic-natural. Asset type: premium residential plumbing company website editorial service photograph, landscape 3:2. A fictional experienced male plumbing professional in his late thirties wears a plain clean navy blue short-sleeved work shirt and tan work trousers, standing beside a beautiful but attainable Northern California kitchen sink, in natural side profile looking down carefully at a brushed nickel kitchen faucet. His right hand is lightly on the small side lever testing the faucet; his left hand rests naturally on the counter. A thin stream of water goes from the gooseneck spout down into the sink, realistic geometry and matching reflections. All cabinetry closed: show NO under-sink pipes, NO exposed pipework, NO technical cutaway. A small neat navy tool bag with two ordinary hand tools rests safely on a protective towel away from the sink. Warm honey oak cabinets, ivory stone counter, window light and soft green garden beyond. Medium-wide candid editorial photograph, natural skin texture, believable anatomy, restrained styling, calm professional demeanor, no looking at camera, no staged thumbs up or handshake. Composition human on left half and full faucet with sink on right half, waist-up three-quarter view, generous natural environment, do not crop off head or hands. Professional 50mm photography, realistic lighting, soft highlights, warm natural tones and navy. No text, no logos, no watermark, no CGI. This is a fictional illustrative plumbing service scene, not an actual employee or project.

## Brand assets

- The original standalone SVG wordmark and mark files were unused and have been removed; the identity now lives in code.
- `src/app/icon.svg`: transparent vector favicon.
- `src/components/ui/Brand.tsx`: inline vector mark and wordmark used in the header and footer.

## Typography

Manrope by Mikhail Sharanda and Mirko Velimirović, from Google Fonts, locally hosted. The variable version (`Manrope[wght].ttf` from the google/fonts repository) is instanced to weights 400–700, subset to Latin and converted to a single ~23 KB WOFF2 in `src/assets/fonts/manrope-variable.woff2`, loaded with `next/font/local`. License: `src/assets/fonts/OFL.txt`.

## Homeowner conversation assets

The homepage approach section uses `src/assets/images/conversation.webp` on desktop and `src/assets/images/conversation-portrait.webp` on phones (originally `approach-conversation.webp` and `approach-conversation-mobile.webp`). Exact generation/edit prompts and purpose are documented in [approach-image-refresh.md](approach-image-refresh.md). Both were made with the built-in image generation tool.

## Responsive variants

`npm run images` (`scripts/generate-images.mjs`) writes 480, 768, 1080 and 1536 px WebP variants of every source photo to `public/images/`, plus the 1200 × 630 Open Graph card `public/og.jpg`. The custom `next/image` loader (`src/lib/image-loader.ts`) picks the right variant for each screen.
