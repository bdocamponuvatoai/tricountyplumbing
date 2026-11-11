"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { CallButton } from "@/components/ui/ButtonLink";
import { business, mobileNav, primaryNav, telHref } from "@/config/site";
import { isCurrentPath } from "./nav";

/** Must match the desktop-nav breakpoint in styles/components/header.css. */
const DESKTOP_QUERY = "(min-width: 835px)";

export function SiteHeader() {
  const pathname = usePathname();
  // Remember which page the menu was opened on: navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpenOnPath(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setOpenOnPath(null);
    };
    root.classList.add("menu-open");
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onBreakpoint);
    return () => {
      root.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" data-open={open || undefined}>
        <div className="wrap header-inner">
          <Link
            className="header-brand"
            href="/"
            aria-label={`${business.name} home`}
            onClick={close}
          >
            <Brand />
          </Link>

          <nav className="header-nav" aria-label="Main navigation">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-phone" href={telHref}>
              <Phone aria-hidden="true" />
              {business.phone}
            </a>
            <Link className="btn btn-primary btn-sm header-cta" href="/contact/">
              Plan your service
            </Link>
            <a
              className="header-icon header-call"
              href={telHref}
              aria-label={`Call ${business.phone}`}
            >
              <Phone aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="header-icon header-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpenOnPath(open ? null : pathname)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="mobile-menu">
            <nav aria-label="Mobile navigation">
              <ul>
                {mobileNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mobile-menu-footer">
              <CallButton size="lg" className="btn-block" />
              <p>{`Based in ${business.location}.`}</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
