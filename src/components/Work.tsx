import Image from "next/image";
import { WORK } from "@/content";
import WordsHeading from "./WordsHeading";

// Sizes per slot in the asymmetric grid, in grid order.
const SIZES = [
  "(max-width: 900px) 100vw, 55vw",
  "(max-width: 900px) 100vw, 32vw",
  "(max-width: 900px) 100vw, 32vw",
  "(max-width: 900px) 100vw, 55vw",
  "(max-width: 900px) 100vw, 45vw",
];

export default function Work() {
  return (
    <section id="work" className="section section--rule" data-reveal>
      <div className="wrap">
        <WordsHeading before="Recent" em="roofs" after="." />
        <div className="work">
          {WORK.map((w, i) => (
            <figure key={w.town} className={`work__item work__item--${i + 1}`} data-reveal>
              <div className="work__img">
                <Image src={w.src} alt={w.alt} fill sizes={SIZES[i]} />
              </div>
              <figcaption className="r">
                <span className="work__town">{w.town}</span> · {w.house} · {w.job}
              </figcaption>
            </figure>
          ))}
          <p className="work__note r" data-reveal>
            Every roof here was photographed at every stage, including the parts that are now under
            tiles. Ask on your survey and we&rsquo;ll show you the full set.
          </p>
        </div>
      </div>
    </section>
  );
}
