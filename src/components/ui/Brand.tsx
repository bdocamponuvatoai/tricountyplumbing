import { cx } from "@/lib/cx";

/** Proposed Tri-County mark and wordmark. Decorative: wrap in a labelled link. */
export function Brand({ className }: { className?: string }) {
  return (
    <span className={cx("brand", className)}>
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 3 44 15v19L24 46 4 34V15Z" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M15 16h18M24 16v17M13 29l7 4M35 29l-7 4"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="m24 5 0 5M6 16l5 3M42 16l-5 3" stroke="currentColor" strokeWidth="2" />
      </svg>
      {/* Real words + CSS uppercase, so the link's accessible name matches. */}
      <span className="brand-word">
        Tri-County <small>Plumbing</small>
      </span>
    </span>
  );
}
