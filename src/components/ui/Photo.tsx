import Image from "next/image";
import { images, type ImageKey } from "@/content/images";
import { cx } from "@/lib/cx";

/**
 * Responsive photo. Photos of (fictional) people always carry a visible
 * "AI illustration" label so nobody mistakes them for staff or customers.
 */
export function Photo({
  image,
  alt,
  sizes = "100vw",
  eager = false,
  className,
}: {
  image: ImageKey;
  alt: string;
  sizes?: string;
  /** The LCP image of the page: load immediately with high priority. */
  eager?: boolean;
  className?: string;
}) {
  const img = images[image];
  return (
    <figure className={cx("photo", className)}>
      <Image
        src={img.src}
        width={img.width}
        height={img.height}
        alt={alt}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
      {img.people && <figcaption className="photo-label">AI illustration</figcaption>}
    </figure>
  );
}
