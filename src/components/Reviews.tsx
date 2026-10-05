import { REVIEWS } from "@/content";
import ScrollWords from "./ScrollWords";
import WordsHeading from "./WordsHeading";

export default function Reviews() {
  const [lead, ...rest] = REVIEWS;

  return (
    <section id="reviews" className="section section--rule" data-reveal>
      <div className="wrap">
        <WordsHeading
          className="heading heading--narrow"
          before="From people whose roofs"
          em="we’ve done"
          after="."
        />

        <div className="reviews__grid">
          {/* The lead review fills in word by word, like the opening statement */}
          <figure className="review review--lead">
            <ScrollWords as="blockquote" text={`“${lead.quote}”`} />
            <figcaption className="r" data-reveal>
              <span className="review__name">{lead.name}</span>
              <span className="review__meta">
                {lead.town} · {lead.job}
              </span>
            </figcaption>
          </figure>

          <div className="reviews__pair">
            {rest.map((r) => (
              <figure key={r.name} className="review r" data-reveal>
                <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption>
                  <span className="review__name">{r.name}</span>
                  <span className="review__meta">
                    {r.town} · {r.job}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
