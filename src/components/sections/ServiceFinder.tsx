"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { finderIssues, plannerHref } from "@/content/finder";

/** "What's on your mind?" picker that pre-fills the service planner. */
export function ServiceFinder() {
  const [choice, setChoice] = useState(0);
  const issue = finderIssues[choice];

  return (
    <section className="section section-alt" aria-labelledby="finder-title">
      <div className="wrap finder">
        <div className="finder-intro">
          <p className="eyebrow">Not sure where to start?</p>
          <h2 className="title-2" id="finder-title">
            What’s on your mind?
          </h2>
          <p className="lead">No plumbing vocabulary needed. Just tell us what’s happening.</p>
        </div>

        <div className="finder-panel reveal">
          <div className="finder-options" role="group" aria-label="Choose your plumbing concern">
            {finderIssues.map((v, i) => (
              <button
                key={v.label}
                type="button"
                aria-pressed={i === choice}
                onClick={() => setChoice(i)}
              >
                <ServiceIcon name={v.icon} size={22} />
                <span>{v.label}</span>
                <span className="finder-check" aria-hidden="true">
                  {i === choice && <Check />}
                </span>
              </button>
            ))}
          </div>
          <div className="finder-result" aria-live="polite">
            <p className="eyebrow">Your next step</p>
            <h3>{issue.title}</h3>
            <p>{issue.text}</p>
            <Link className="btn btn-primary btn-md" href={plannerHref(issue.service, issue.label)}>
              Build my service summary
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
