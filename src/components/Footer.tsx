import { HOURS, PHONE, PHONE_HREF, SERVICES } from "@/content";
import { order } from "@/lib/motion";

const COMPANY = [
  { label: "Our work", href: "#work" },
  { label: "How a reroof goes", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book a survey", href: "#survey" },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Revealed as one group: the bottom line can never scroll far enough up to trigger on its own */}
      <div className="wrap" data-reveal>
        <div className="footer__top">
          <div className="footer__brand r">
            <a href="#top" className="wordmark">
              Whitecombe Roofing
            </a>
            <p>Pitched and flat roofing across Surrey. Family-run since 1994.</p>
          </div>

          <div className="footer__col r" style={order(1)}>
            <h3>Services</h3>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.num}>
                  <a href="#services">{s.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col r" style={order(2)}>
            <h3>Company</h3>
            <ul>
              {COMPANY.map((c) => (
                <li key={c.label}>
                  <a href={c.href}>{c.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col r" style={order(3)}>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={PHONE_HREF}>{PHONE}</a>
              </li>
              <li>
                <a href="mailto:office@whitecombe-roofing.co.uk">office@whitecombe-roofing.co.uk</a>
              </li>
              <li>{HOURS}</li>
              <li>Reigate, Surrey</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom r" style={order(4)}>
          <p>&copy; 2026 Whitecombe Roofing</p>
          <p>Concept preview. Design and build by Slate &amp; Code.</p>
        </div>
      </div>
    </footer>
  );
}
