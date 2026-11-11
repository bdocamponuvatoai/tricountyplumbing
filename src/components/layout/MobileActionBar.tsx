"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CallButton } from "@/components/ui/ButtonLink";
import { isCurrentPath } from "./nav";

/**
 * Floating call bar on phones. Hidden on desktop, while the menu is open, and
 * on /contact/ (the page has its own call card, and a bar over a form gets in
 * the way of the on-screen keyboard).
 */
export function MobileActionBar() {
  const pathname = usePathname();
  if (isCurrentPath(pathname, "/contact/")) return null;
  return (
    <div className="action-bar" aria-label="Quick contact" role="region">
      <CallButton label="Call now" />
      <Link className="btn btn-secondary btn-md" href="/contact/">
        Plan your service
      </Link>
    </div>
  );
}
