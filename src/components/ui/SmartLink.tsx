import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };

/** Internal paths use next/link; tel:, sms:, mailto: and external URLs use <a>. */
export function SmartLink({ href, ...rest }: Props) {
  if (href.startsWith("/")) return <Link href={href} {...rest} />;
  return <a href={href} {...rest} />;
}
