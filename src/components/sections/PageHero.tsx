import type { ReactNode } from "react";

/** Centered hero for inner pages: eyebrow, two-tone title, lead. */
export function PageHero({
  eyebrow,
  title,
  tone,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Second, muted line of the title. */
  tone?: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="title-1">
        {title}
        {tone && (
          <>
            {" "}
            <span className="tone">{tone}</span>
          </>
        )}
      </h1>
      <p className="lead">{lead}</p>
      {children}
    </section>
  );
}
