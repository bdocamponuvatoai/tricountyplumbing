"use client";

import { useSearchParams } from "next/navigation";
import { getService, NOT_SURE } from "@/content/services";
import { ServicePlanner, type PlannerPreset } from "./ServicePlanner";

/**
 * Reads ?service=&concern= presets (from service pages and the finder).
 * Rendered inside <Suspense fallback={<ServicePlanner />}> so the static HTML
 * still contains the planner. Keyed by preset so a new preset resets state.
 */
export function PlannerFromQuery() {
  const params = useSearchParams();
  const service = params.get("service") ?? "";
  const valid = service === NOT_SURE || Boolean(getService(service));
  const preset: PlannerPreset | undefined = valid
    ? { service, details: params.get("concern") ?? "" }
    : undefined;
  return (
    <ServicePlanner
      key={preset ? `${preset.service}|${preset.details}` : "blank"}
      preset={preset}
    />
  );
}
