import type { ImageKey } from "./images";

export type Guide = {
  slug: string;
  category: string;
  title: string;
  image: ImageKey;
  time: string;
  description: string;
  sections: { heading: string; body: string }[];
};

export const guides: Guide[] = [
  {
    slug: "before-your-visit",
    category: "A smoother service visit",
    title: "A little preparation. A clearer conversation.",
    image: "craft",
    time: "2 min read",
    description: "Bring the right details to your first plumbing conversation.",
    sections: [
      {
        heading: "Start with what you’ve noticed",
        body: "You don’t need to know the name of a pipe or diagnose the problem. Describe what you see, hear, or experience, and which room or fixture is involved.",
      },
      {
        heading: "Make a simple timeline",
        body: "Note when the issue started, whether it is constant or intermittent, and whether anything changed shortly before it appeared. Mention any earlier repairs.",
      },
      {
        heading: "Gather useful details",
        body: "A fixture model, product manual, or photo taken from a safe, accessible position can help explain your question. There is no need to take anything apart.",
      },
      {
        heading: "Confirm the visit by phone",
        body: "Discuss the location, scope of work, availability, and any visit or assessment charges directly. A saved request summary is preparation for a conversation, not a confirmed appointment.",
      },
    ],
  },
  {
    slug: "know-your-plumbing",
    category: "Know your home",
    title: "Notice the small things around your home.",
    image: "home",
    time: "2 min read",
    description: "A simple way to keep your plumbing questions in one place.",
    sections: [
      {
        heading: "Start with your daily routine",
        body: "Think about the fixtures you use most: kitchen faucet, bathroom sinks, showers, and toilets. Make a note of anything that feels different from normal.",
      },
      {
        heading: "Describe, rather than diagnose",
        body: "A recurring drip, an unusual sound, or a change in drainage is useful information. Let a plumbing professional assess the cause and appropriate next steps.",
      },
      {
        heading: "Keep a home record",
        body: "Save product manuals and a record of past work. Having model names and dates together can make future repair or replacement conversations easier.",
      },
      {
        heading: "Bring your questions together",
        body: "Use the service planner to create a short list. If something needs prompt attention, call to discuss availability rather than relying on a saved summary.",
      },
    ],
  },
  {
    slug: "planning-an-upgrade",
    category: "Thoughtful improvements",
    title: "Choose the fixture. Think through the fit.",
    image: "kitchen",
    time: "2 min read",
    description: "What to bring to a conversation about your next fixture installation.",
    sections: [
      {
        heading: "Think about how you use the space",
        body: "Consider everyday needs, ease of use, finish, and the style of the room. A new fixture should work for your routine as well as your home.",
      },
      {
        heading: "Save the product details",
        body: "Keep the exact model, manufacturer’s specifications, and any included parts information. Similar-looking products can have different installation requirements.",
      },
      {
        heading: "Discuss compatibility before buying",
        body: "Share your existing setup and the fixture you’re considering. Connections, clearances, mounting points, and the surrounding surfaces can affect the work involved.",
      },
      {
        heading: "Confirm the complete scope",
        body: "Ask about labor, materials, removal of the existing fixture, access, and scheduling. Agree on the details directly before moving forward.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
