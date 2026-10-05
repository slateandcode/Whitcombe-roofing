import { PHONE, PHONE_HREF, TOWNS } from "@/content";
import { order } from "@/lib/motion";
import AreasMap from "./AreasMap";
import Faq from "./Faq";
import WordsHeading from "./WordsHeading";

const ROWS = Math.ceil((TOWNS.length + 1) / 2);

export default function AreasFaq() {
  return (
    <section className="section section--rule areas-section" data-reveal>
      <div className="wrap areas">
        <WordsHeading before="Where we" em="work" after="." />
        <p className="areas__lede r" data-reveal>
          Nine towns and the villages between them, all within about sixteen miles of the yard in
          Reigate. Close enough that someone can be up a ladder the same day a storm comes through.
        </p>
      </div>

      <AreasMap />

      {/* On a phone the map crops to the middle of the patch, so the towns are listed too */}
      <div className="wrap">
        <ul className="towns" data-reveal>
          {TOWNS.map((t, i) => (
            <li key={t} className="r" style={order(i % ROWS)}>
              {t}
            </li>
          ))}
          <li className="towns__more r" style={order(TOWNS.length % ROWS)}>
            and surrounding villages
          </li>
        </ul>
      </div>

      <div className="wrap faqs">
        <div className="faqs__intro">
          <WordsHeading before="Questions we get" em="asked" after="." />
          <p className="faqs__aside r" data-reveal>
            Something we haven&rsquo;t covered? Ring <a href={PHONE_HREF}>{PHONE}</a> and ask. You&rsquo;ll
            get whoever&rsquo;s in the yard, not a call centre.
          </p>
        </div>
        <div className="faqs__list">
          <Faq />
        </div>
      </div>
    </section>
  );
}
