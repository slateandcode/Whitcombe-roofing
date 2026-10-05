import { CORNERS } from "@/content";
import { order } from "@/lib/motion";
import WordsHeading from "./WordsHeading";

// Four bars stepping up like the hero's roofline. Heights are rank, not a
// measurement: each corner takes longer than the last to show itself.
export default function CornersCut() {
  return (
    <section className="corners" aria-labelledby="corners-heading">
      <div className="wrap corners__inner">
        <div className="corners__intro">
          <div id="corners-heading">
            <WordsHeading before="Most roofing companies skip" em="the following" after="." />
          </div>
          <p className="corners__lede r" data-reveal>
            None of it shows the day the scaffold comes down. It shows later, in roughly this
            order.
          </p>
        </div>

        <ol className="corners__bars" data-reveal>
          {CORNERS.map((c, i) => (
            <li key={c.what} className={`corners__bar corners__bar--${i + 1}`} style={order(i)}>
              <div className="corners__text">
                <span className="corners__when">{c.when}</span>
                <h3>{c.what}</h3>
                <p>{c.then}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="corners__foot r" data-reveal>
          We don&rsquo;t skip any of them. It&rsquo;s why the guarantee runs to fifteen years.
        </p>
      </div>
    </section>
  );
}
