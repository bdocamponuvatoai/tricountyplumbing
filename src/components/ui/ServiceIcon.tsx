import { CircleQuestionMark, Droplet, House, ShowerHead, Waves } from "lucide-react";
import type { ServiceIconName } from "@/content/services";

const ICONS = {
  drop: Droplet,
  waves: Waves,
  tap: ShowerHead,
  home: House,
  help: CircleQuestionMark,
};

export function ServiceIcon({
  name,
  size = 24,
  className,
}: {
  name: ServiceIconName | "help";
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" className={className} />;
}
