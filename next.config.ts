import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to out/.
  output: "export",
  // /about/ -> out/about/index.html, so any static host serves it.
  trailingSlash: true,
  images: {
    // Static export has no image server. The custom loader maps each
    // requested width to a pre-generated variant in public/images/
    // (see scripts/generate-images.mjs). Keep these widths in sync with
    // WIDTHS in that script.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [768, 1080, 1536],
    imageSizes: [480],
  },
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;
