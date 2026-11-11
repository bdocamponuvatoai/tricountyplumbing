import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { guides, type Guide } from "@/content/guides";
import { cx } from "@/lib/cx";

/** Guide cards. Becomes a swipeable row on phones when `carousel` is set. */
export function GuideCards({
  items = guides,
  headingLevel = 3,
  carousel = false,
}: {
  items?: Guide[];
  headingLevel?: 2 | 3;
  carousel?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className={cx("cards", carousel && "cards-carousel")}>
      {items.map((g) => (
        <li key={g.slug}>
          <Link className="card" href={`/your-home/${g.slug}/`}>
            <Photo
              image={g.image}
              alt=""
              sizes="(min-width: 1080px) 400px, (min-width: 735px) 50vw, 82vw"
            />
            <p className="card-meta">
              <span>{g.category}</span>
              <span>{g.time}</span>
            </p>
            <Heading className="card-title">{g.title}</Heading>
            <p className="card-text">{g.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
