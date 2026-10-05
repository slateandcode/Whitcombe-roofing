import Image from "next/image";
import { SURVEY_STEPS } from "@/content";
import { order } from "@/lib/motion";
import WordsHeading from "./WordsHeading";

export default function SurveySteps() {
  return (
    <section className="section section--rule" data-reveal>
      <div className="wrap survey">
        <div className="survey__copy">
          <WordsHeading
            className="heading heading--narrow"
            before="The survey is"
            em="free"
            after=". Here’s what you get."
          />
          {/* A timeline that draws down as the steps arrive */}
          <ol className="timeline" data-reveal>
            {SURVEY_STEPS.map((s, i) => (
              <li key={s.num} className="r" style={order(i)}>
                <span className="timeline__num">{s.num}</span>
                <h3>{s.lead}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="survey__media" data-reveal>
          <div className="survey__img">
            <Image
              src="/images/survey-drone.jpg"
              alt="Drone photo looking straight down on a house and its roof slopes"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <figcaption className="r">
            What you get on day one: every slope from above, before anyone goes up a ladder.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
