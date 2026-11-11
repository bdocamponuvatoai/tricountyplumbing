import type { ImageKey } from "./images";

export type ServiceIconName = "drop" | "waves" | "tap" | "home";

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Short headline used as the service page H1. */
  short: string;
  icon: ServiceIconName;
  description: string;
  intro: string;
  image: ImageKey;
  alt: string;
  items: string[];
  prepare: string[];
};

export const services: Service[] = [
  {
    slug: "plumbing-repairs",
    number: "01",
    title: "Plumbing repairs",
    short: "Make the drip a thing of the past.",
    icon: "drop",
    description:
      "From a dripping faucet to a troublesome connection, start with a conversation about what you’re noticing.",
    intro:
      "Little plumbing problems have a way of interrupting the whole day. Let’s get a clearer picture of what’s going on and discuss the repair your home needs.",
    image: "craft",
    alt: "Illustration of a plumber checking a kitchen faucet",
    items: [
      "Dripping faucets and leaking connections",
      "Visible pipe leaks",
      "Water pressure concerns",
      "Repair or replacement conversations",
    ],
    prepare: [
      "Where are you noticing the problem?",
      "When did it start, and is it constant?",
      "Has anything recently changed or been repaired?",
    ],
  },
  {
    slug: "drains-and-toilets",
    number: "02",
    title: "Drains & toilets",
    short: "Back to the everyday flow.",
    icon: "waves",
    description:
      "Slow drainage, a running toilet, or a fixture that isn’t working as it should. Tell us what’s happening.",
    intro:
      "The fixtures you use every day should feel effortless. Talk through a slow sink, a running toilet, or a recurring drainage concern with a local plumbing professional.",
    image: "kitchen",
    alt: "Illustration of a kitchen sink and brushed nickel faucet",
    items: [
      "Slow sink or shower drainage",
      "Running or poorly flushing toilets",
      "Toilet components and connections",
      "Recurring fixture concerns",
    ],
    prepare: [
      "Which fixtures are affected?",
      "Does the issue happen every time?",
      "Have you noticed changes elsewhere in the home?",
    ],
  },
  {
    slug: "fixture-installation",
    number: "03",
    title: "Fixture installations",
    short: "The details that make a home.",
    icon: "tap",
    description:
      "A new faucet, a replacement toilet, or a practical upgrade. Bring a little more ease to your daily routine.",
    intro:
      "Sometimes a small upgrade makes a big difference to the way a room works. Start a conversation about your new fixture, existing connections, and the installation you have in mind.",
    image: "kitchen",
    alt: "Illustration of a finished kitchen with a modern faucet and stone counter",
    items: [
      "Kitchen and bathroom faucets",
      "Toilet replacements",
      "Sink and fixture connections",
      "Planning a fixture upgrade",
    ],
    prepare: [
      "Do you already have a fixture in mind?",
      "Is this a replacement or a new location?",
      "Do you have the product model or specification sheet?",
    ],
  },
  {
    slug: "maintenance",
    number: "04",
    title: "Home plumbing care",
    short: "A little attention goes a long way.",
    icon: "home",
    description:
      "Keep an eye on the everyday essentials, and make space to discuss those little concerns before your next project.",
    intro:
      "Looking after a home means keeping track of the details. Bring your plumbing questions together and discuss a practical approach to ongoing maintenance.",
    image: "home",
    alt: "Illustration of a Northern California home with a landscaped front entrance",
    items: [
      "Everyday fixture concerns",
      "Visible connections and recurring drips",
      "Planning ahead for replacements",
      "General home plumbing questions",
    ],
    prepare: [
      "Which parts of your plumbing would you like to discuss?",
      "Are there recurring issues or recent changes?",
      "Are you planning any home improvements?",
    ],
  },
];

export const NOT_SURE = "not-sure";

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function serviceLabel(slug: string): string {
  return getService(slug)?.title ?? "Not sure yet";
}
