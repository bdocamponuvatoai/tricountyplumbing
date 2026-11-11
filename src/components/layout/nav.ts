/** True when `pathname` is `href` or one of its child routes. */
export function isCurrentPath(pathname: string, href: string): boolean {
  const base = href.replace(/\/$/, "");
  if (base === "") return pathname === "/" || pathname === "";
  return pathname === base || pathname.startsWith(`${base}/`);
}
