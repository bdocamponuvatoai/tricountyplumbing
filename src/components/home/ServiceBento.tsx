import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { getService, type Service } from "@/content/services";
import { cx } from "@/lib/cx";

type Tile = {
  slug: string;
  /** Visual treatment of the tile. */
  look: "photo" | "dark" | "plain";
  span: "wide" | "narrow";
};

// Checkerboard: photo tiles alternate sides so the grid reads as a rhythm.
const TILES: Tile[] = [
  { slug: "plumbing-repairs", look: "photo", span: "wide" },
  { slug: "drains-and-toilets", look: "dark", span: "narrow" },
  { slug: "maintenance", look: "plain", span: "narrow" },
  { slug: "fixture-installation", look: "photo", span: "wide" },
];

function BentoTile({ service, tile }: { service: Service; tile: Tile }) {
  return (
    <li className={cx("tile", `tile-look-${tile.look}`, `tile-${tile.span}`, "reveal")}>
      <Link href={`/services/${service.slug}/`} className="tile-link">
        {tile.look === "photo" ? (
          <Photo
            image={service.image}
            alt=""
            className="tile-photo"
            sizes="(min-width: 1080px) 700px, 100vw"
          />
        ) : (
          <span className="tile-icon">
            <ServiceIcon name={service.icon} size={30} />
          </span>
        )}
        <div className="tile-body">
          <p className="tile-number">{service.number}</p>
          <h3 className="tile-title">{service.title}</h3>
          <p className="tile-text">{service.description}</p>
          <span className="link tile-more">
            Learn more
            <ChevronRight aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ServiceBento() {
  return (
    <ul className="bento">
      {TILES.map((tile) => {
        const service = getService(tile.slug);
        return service ? <BentoTile key={tile.slug} service={service} tile={tile} /> : null;
      })}
    </ul>
  );
}
