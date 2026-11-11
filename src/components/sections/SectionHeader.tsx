import type { ReactNode } from "react";

/** Section eyebrow + two-tone H2, with an optional lead and action alongside. */
export function SectionHeader({
  eyebrow,
  title,
  tone,
  lead,
  action,
  id,
}: {
  eyebrow: string;
  title: string;
  tone?: string;
  lead?: string;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="title-2" id={id}>
          {title}
          {tone && (
            <>
              {" "}
              <span className="tone">{tone}</span>
            </>
          )}
        </h2>
      </div>
      {(lead || action) && (
        <div className="section-header-aside">
          {lead && <p className="lead">{lead}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
