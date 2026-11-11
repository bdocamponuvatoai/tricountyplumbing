import { Plus } from "lucide-react";
import { TextLink } from "@/components/ui/ButtonLink";
import { faqs } from "@/content/faqs";

export function FaqSection() {
  return (
    <section className="section section-alt" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="faq-intro">
          <p className="eyebrow">Questions</p>
          <h2 className="title-2" id="faq-title">
            Good questions. <span className="tone">Simple answers.</span>
          </h2>
          <p className="faq-more">Something else on your mind?</p>
          <TextLink href="/contact/">Plan your service</TextLink>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>
                <span>{f.question}</span>
                <Plus aria-hidden="true" className="faq-icon" />
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
