"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ArrowLeft, ArrowRight, Check, Copy, Download, MessageSquare } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { business } from "@/config/site";
import { NOT_SURE, serviceLabel, services, type ServiceIconName } from "@/content/services";
import {
  buildSummary,
  smsHref,
  TIMING_OPTIONS,
  URGENT_TIMING,
  validateStep,
  type PlannerErrors,
  type PlannerValues,
} from "@/lib/summary";

const STEPS = [
  {
    label: "Your service",
    title: "What can we help with?",
    intro: "Choose the closest fit. It’s fine if you’re not sure yet.",
  },
  {
    label: "The details",
    title: "A few helpful details.",
    intro: "A short description is enough. No need to diagnose the problem.",
  },
  {
    label: "Ready to share",
    title: "Your summary is ready.",
    intro: "Review your details, then choose how to share them. Nothing has been sent yet.",
  },
];

const SERVICE_CHOICES: { slug: string; title: string; icon: ServiceIconName | "help" }[] = [
  ...services.map((s) => ({ slug: s.slug, title: s.title, icon: s.icon })),
  { slug: NOT_SURE, title: "Not sure yet", icon: "help" },
];

export type PlannerPreset = { service: string; details: string };

export function ServicePlanner({ preset }: { preset?: PlannerPreset }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<PlannerValues>({
    service: preset?.service ?? "",
    name: "",
    phone: "",
    city: "Tracy",
    timing: TIMING_OPTIONS[0],
    details: preset?.details ?? "",
  });
  const [errors, setErrors] = useState<PlannerErrors>({});
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const summary = buildSummary(values);
  const current = STEPS[step];

  function update<K extends keyof PlannerValues>(key: K, value: PlannerValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
    setNotice("");
  }

  function goTo(next: number) {
    flushSync(() => {
      setStep(next);
      setNotice("");
    });
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "nearest" });
  }

  function handleContinue() {
    const found = validateStep(step, values);
    flushSync(() => setErrors(found));
    if (Object.keys(found).length > 0) {
      // Focus the first invalid control (for the radio group, its first radio).
      const invalid = bodyRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      const target = invalid?.matches("input, select, textarea")
        ? invalid
        : invalid?.querySelector<HTMLElement>("input");
      target?.focus();
      return;
    }
    goTo(step + 1);
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setNotice("Summary copied. Paste it into a message when you’re ready.");
    } catch {
      setNotice("Copy is unavailable in this browser. Use “Download summary” to save a copy.");
    }
  }

  function downloadSummary() {
    const url = URL.createObjectURL(new Blob([summary], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "tri-county-plumbing-service-summary.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Your summary has been downloaded. Nothing has been sent to Tri-County Plumbing.");
  }

  const fieldProps = (key: keyof PlannerValues) => ({
    id: key,
    value: values[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  const fieldError = (key: keyof PlannerValues) =>
    errors[key] ? (
      <span id={`${key}-error`} className="field-error">
        {errors[key]}
      </span>
    ) : null;

  return (
    <section className="planner" aria-label="Service summary builder">
      <ol className="stepper">
        {STEPS.map((s, i) => (
          <li
            key={s.label}
            className={i === step ? "is-current" : i < step ? "is-complete" : undefined}
            aria-current={i === step ? "step" : undefined}
          >
            <span className="stepper-bar" aria-hidden="true" />
            <span className="stepper-label">
              {i < step ? <Check aria-hidden="true" /> : <span>{`0${i + 1}`}</span>}
              <span className="stepper-text">{s.label}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="planner-body" ref={bodyRef}>
        <p className="eyebrow">{`Step ${step + 1} of ${STEPS.length}`}</p>
        <h2 className="planner-title" ref={headingRef} tabIndex={-1}>
          {current.title}
        </h2>
        <p className="planner-intro">{current.intro}</p>

        {step === 0 && (
          <fieldset
            className="service-options"
            role="radiogroup"
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <legend className="sr-only">Select a service</legend>
            {SERVICE_CHOICES.map((s) => (
              <label key={s.slug} className={values.service === s.slug ? "is-selected" : undefined}>
                <input
                  type="radio"
                  name="service"
                  value={s.slug}
                  checked={values.service === s.slug}
                  onChange={() => update("service", s.slug)}
                />
                <ServiceIcon name={s.icon} size={26} />
                <span>{s.title}</span>
                <span className="option-check" aria-hidden="true">
                  {values.service === s.slug && <Check />}
                </span>
              </label>
            ))}
            {errors.service && (
              <p id="service-error" className="field-error" role="alert">
                {errors.service}
              </p>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <div className="fields">
            <div className="field-row">
              <label className="field" htmlFor="name">
                <span>Your name</span>
                <input
                  {...fieldProps("name")}
                  autoComplete="name"
                  maxLength={80}
                  required
                  onChange={(e) => update("name", e.target.value)}
                />
                {fieldError("name")}
              </label>
              <label className="field" htmlFor="phone">
                <span>Phone number</span>
                <input
                  {...fieldProps("phone")}
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  required
                  onChange={(e) => update("phone", e.target.value)}
                />
                {fieldError("phone")}
              </label>
            </div>
            <div className="field-row">
              <label className="field" htmlFor="city">
                <span>City or ZIP code</span>
                <input
                  {...fieldProps("city")}
                  autoComplete="address-level2"
                  maxLength={90}
                  required
                  onChange={(e) => update("city", e.target.value)}
                />
                {fieldError("city")}
              </label>
              <label className="field" htmlFor="timing">
                <span>When are you thinking?</span>
                <select
                  id="timing"
                  value={values.timing}
                  onChange={(e) => update("timing", e.target.value)}
                >
                  {TIMING_OPTIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            {values.timing === URGENT_TIMING && (
              <p className="timing-note">{`For prompt attention, call ${business.phone} to discuss availability.`}</p>
            )}
            <label className="field" htmlFor="details">
              <span>What would you like help with?</span>
              <textarea
                {...fieldProps("details")}
                aria-describedby={errors.details ? "details-error" : "details-help"}
                rows={4}
                placeholder="The fixture, the room, and what you’ve noticed…"
                maxLength={1200}
                required
                onChange={(e) => update("details", e.target.value)}
              />
              {fieldError("details")}
              <small id="details-help">
                Please leave out sensitive information and your full street address.
              </small>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="review">
            <dl className="review-list">
              <div>
                <dt>Service</dt>
                <dd>{serviceLabel(values.service)}</dd>
              </div>
              <div>
                <dt>Your name</dt>
                <dd>{values.name}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{values.phone}</dd>
              </div>
              <div>
                <dt>City / ZIP</dt>
                <dd>{values.city}</dd>
              </div>
              <div>
                <dt>Timing</dt>
                <dd>{values.timing}</dd>
              </div>
              <div className="review-details">
                <dt>What you need</dt>
                <dd>{values.details}</dd>
              </div>
            </dl>
            <a
              className="btn btn-primary btn-lg btn-block"
              href={smsHref(summary)}
              onClick={() =>
                setNotice(
                  "Your messaging app will open if supported. Review and send the message there; this website cannot confirm delivery.",
                )
              }
            >
              <MessageSquare aria-hidden="true" />
              Open text message
            </a>
            <div className="share-tools">
              <button type="button" className="btn btn-secondary btn-md" onClick={copySummary}>
                <Copy aria-hidden="true" />
                Copy summary
              </button>
              <button type="button" className="btn btn-secondary btn-md" onClick={downloadSummary}>
                <Download aria-hidden="true" />
                Download summary
              </button>
            </div>
            <p className="share-note">
              Opens your messaging app. You decide whether to send. Call to confirm receipt,
              availability, and any visit charges.
            </p>
          </div>
        )}

        <div className="planner-controls">
          {step > 0 ? (
            <button
              type="button"
              className="btn btn-secondary btn-md"
              onClick={() => goTo(step - 1)}
            >
              <ArrowLeft aria-hidden="true" />
              {step === 2 ? "Edit details" : "Back"}
            </button>
          ) : (
            <span />
          )}
          {step < 2 && (
            <button type="button" className="btn btn-primary btn-md" onClick={handleContinue}>
              {step === 0 ? "Continue" : "Review my summary"}
              <ArrowRight aria-hidden="true" />
            </button>
          )}
        </div>

        {notice && (
          <p className="planner-status" role="status">
            {notice}
          </p>
        )}
        <p className="planner-privacy">
          Your entries stay in this browser while you’re on this page. No form data is submitted
          automatically. <Link href="/privacy/">Privacy details</Link>.
        </p>
      </div>
    </section>
  );
}
