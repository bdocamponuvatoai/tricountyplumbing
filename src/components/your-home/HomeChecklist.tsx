"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { TextLink } from "@/components/ui/ButtonLink";

const ITEMS = [
  "Write down the fixture or room involved",
  "Note when you first noticed the issue",
  "Gather any product or model details",
  "List the questions you’d like to ask",
];

export function HomeChecklist() {
  const [done, setDone] = useState<string[]>([]);
  const pct = (done.length / ITEMS.length) * 100;

  return (
    <section className="checklist reveal" aria-labelledby="checklist-title">
      <div className="checklist-intro">
        <p className="eyebrow">Ready for the conversation</p>
        <h2 className="title-3" id="checklist-title">
          A useful little checklist.
        </h2>
        <p>Tick off what you have. You can still get in touch if you don’t have every detail.</p>
        <p className="check-progress" aria-live="polite">
          {`${done.length} of ${ITEMS.length} ready`}
        </p>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div className="checklist-items">
        {ITEMS.map((item) => {
          const checked = done.includes(item);
          return (
            <label key={item} className={checked ? "is-checked" : undefined}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) =>
                  setDone((d) => (e.target.checked ? [...d, item] : d.filter((x) => x !== item)))
                }
              />
              <span className="checkbox-look" aria-hidden="true">
                <Check />
              </span>
              <span>{item}</span>
            </label>
          );
        })}
        <TextLink href="/contact/">Put it all together</TextLink>
      </div>
    </section>
  );
}
