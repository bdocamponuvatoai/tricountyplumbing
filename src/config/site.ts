// Business details and navigation. Safe to import from client components.
// Every fact here is sourced in docs/content-provenance.md. Do not add hours,
// prices, licences, reviews or service-area claims without owner approval.

export const business = {
  name: "Tri-County Plumbing",
  owner: "Ronald Harang",
  city: "Tracy",
  region: "CA",
  location: "Tracy, California",
  phone: "(213) 300-9203",
  tel: "+12133009203",
} as const;

export const telHref = `tel:${business.tel}`;

type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Guides", href: "/your-home/" },
];

export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  ...primaryNav,
  { label: "Plan your service", href: "/contact/" },
];
