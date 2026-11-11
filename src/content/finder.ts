import type { ServiceIconName } from "./services";
import { NOT_SURE } from "./services";

type FinderIssue = {
  label: string;
  icon: ServiceIconName | "help";
  service: string;
  title: string;
  text: string;
};

export const finderIssues: FinderIssue[] = [
  {
    label: "A drip or a leak",
    icon: "drop",
    service: "plumbing-repairs",
    title: "Let’s start with the repair.",
    text: "Note where you noticed the leak and when it started. You don’t need to identify the cause before getting in touch.",
  },
  {
    label: "A drain or toilet",
    icon: "waves",
    service: "drains-and-toilets",
    title: "Let’s talk about what’s changed.",
    text: "Tell us which fixture is affected and whether the issue happens every time or comes and goes.",
  },
  {
    label: "A new fixture",
    icon: "tap",
    service: "fixture-installation",
    title: "A thoughtful upgrade starts here.",
    text: "Have a product in mind? Keep the model or specification sheet handy so you can discuss fit and connections.",
  },
  {
    label: "Not sure yet",
    icon: "help",
    service: NOT_SURE,
    title: "You don’t have to know the answer.",
    text: "A description of what you’re noticing is a good place to start. Bring your questions to the conversation.",
  },
];

export function plannerHref(service: string, concern?: string): string {
  const q = new URLSearchParams({ service });
  if (concern) q.set("concern", concern);
  return `/contact/?${q.toString()}`;
}
