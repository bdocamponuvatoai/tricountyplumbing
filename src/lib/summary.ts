import { business } from "@/config/site";
import { serviceLabel } from "@/content/services";

export type PlannerValues = {
  service: string;
  name: string;
  phone: string;
  city: string;
  timing: string;
  details: string;
};

export const TIMING_OPTIONS = [
  "Flexible / planning ahead",
  "As soon as availability allows",
  "In the next few weeks",
] as const;

export const URGENT_TIMING = TIMING_OPTIONS[1];

/** Plain-text summary the visitor can text, copy or download. */
export function buildSummary(v: PlannerValues): string {
  return [
    `Hi ${business.name}, I’d like to discuss a plumbing service.`,
    "",
    `Service: ${serviceLabel(v.service)}`,
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `City / ZIP: ${v.city.trim()}`,
    `Timing: ${v.timing}`,
    "",
    "What I need:",
    v.details.trim(),
    "",
    "Please let me know your availability and any assessment or visit charges.",
    "",
    `Prepared on the ${business.name} design preview. This is an inquiry, not a confirmed booking.`,
  ].join("\n");
}

export function smsHref(summary: string): string {
  return `sms:${business.tel}?body=${encodeURIComponent(summary)}`;
}

export type PlannerErrors = Partial<Record<keyof PlannerValues, string>>;

export function validateStep(step: number, v: PlannerValues): PlannerErrors {
  const e: PlannerErrors = {};
  if (step === 0 && !v.service) e.service = "Choose a service or “Not sure yet.”";
  if (step === 1) {
    if (!v.name.trim()) e.name = "Enter your name.";
    if (v.phone.replace(/\D/g, "").length < 10)
      e.phone = "Enter a phone number with at least 10 digits.";
    if (!v.city.trim()) e.city = "Enter your city or ZIP code.";
    if (!v.details.trim()) e.details = "Add a short description of what you need.";
  }
  return e;
}
