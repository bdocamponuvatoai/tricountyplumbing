import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { business, telHref } from "@/config/site";
import { services } from "@/content/services";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label={`${business.name} home`}>
              <Brand />
            </Link>
            <p>
              For the home you live in.
              <br />
              And the life that happens in it.
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}/`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Tri-County</h2>
            <ul>
              <li>
                <Link href="/about/">About</Link>
              </li>
              <li>
                <Link href="/your-home/">Homeowner guides</Link>
              </li>
              <li>
                <Link href="/contact/">Plan your service</Link>
              </li>
              <li>
                <Link href="/privacy/">Privacy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Talk to us</h2>
            <a className="footer-phone" href={telHref}>
              {business.phone}
            </a>
            <p>
              {`Based in ${business.location}.`}
              <br />
              Call to discuss your project and confirm availability.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{`© ${new Date().getFullYear()} ${business.name}`}</p>
          <p>Design concept by Nuvato</p>
        </div>
        <p className="footer-note">
          Design preview with a proposed identity. Photos are AI-generated illustrations, not actual
          staff, customers or completed projects. Service summaries stay in your browser until you
          choose to share them.
        </p>
      </div>
    </footer>
  );
}
