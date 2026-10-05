"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { HOURS, PHONE, PHONE_HREF, PROBLEMS, URGENCY } from "@/content";
import WordsHeading from "./WordsHeading";

const STEPS = ["The problem", "How soon", "The house", "Your details"];
// Picking an option shows as selected for a beat before the next step arrives.
const ADVANCE_AFTER = 260;

type Answers = {
  problem: string;
  urgency: string;
  postcode: string;
  notes: string;
  files: string[];
  name: string;
  phone: string;
};

const EMPTY: Answers = { problem: "", urgency: "", postcode: "", notes: "", files: [], name: "", phone: "" };

const tidyPostcode = (v: string) => v.toUpperCase().replace(/\s+/g, " ").trimStart();
const postcodeOk = (v: string) => /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(v.trim());
const phoneOk = (v: string) => v.replace(/\D/g, "").length >= 10;

function Choices({
  label,
  options,
  value,
  onPick,
}: {
  label: string;
  options: { label: string; hint: string }[];
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="choices" role="group" aria-label={label}>
      {options.map((o, i) => (
        <button
          key={o.label}
          type="button"
          className="choice"
          aria-pressed={value === o.label}
          style={{ "--i": i } as CSSProperties}
          onClick={() => onPick(o.label)}
        >
          <span className="choice__text">
            <span className="choice__label">{o.label}</span>
            <span className="choice__hint">{o.hint}</span>
          </span>
          <span className="choice__mark" aria-hidden />
        </button>
      ))}
    </div>
  );
}

// Four-step survey request: two tap-to-choose steps, then the address and
// who to call. Concept build, so sending just confirms on the page.
export default function SurveyForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [a, setA] = useState<Answers>(EMPTY);
  const [sent, setSent] = useState(false);
  const [tried, setTried] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const timer = useRef(0);

  // Move focus to the new step's question so keyboard and screen reader
  // users land where the content changed.
  useEffect(() => {
    if (moved.current) titleRef.current?.focus({ preventScroll: true });
  }, [step, sent]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (to: number) => {
    moved.current = true;
    setTried(false);
    setDir(to >= step ? 1 : -1);
    setStep(to);
  };

  const pick = (key: "problem" | "urgency", v: string) => {
    setA((p) => ({ ...p, [key]: v }));
    clearTimeout(timer.current);
    const next = step + 1;
    timer.current = window.setTimeout(() => go(next), ADVANCE_AFTER);
  };

  const set = (key: "postcode" | "notes" | "name" | "phone") => (e: { target: { value: string } }) =>
    setA((p) => ({ ...p, [key]: key === "postcode" ? tidyPostcode(e.target.value) : e.target.value }));

  const onHouse = (e: FormEvent) => {
    e.preventDefault();
    if (!postcodeOk(a.postcode)) return setTried(true);
    go(3);
  };

  const onDetails = (e: FormEvent) => {
    e.preventDefault();
    if (!a.name.trim() || !phoneOk(a.phone)) return setTried(true);
    moved.current = true;
    setSent(true);
  };

  // What they've told us so far; each one jumps back to its step.
  const recap = [
    { step: 0, text: a.problem },
    { step: 1, text: a.urgency },
    { step: 2, text: a.postcode },
  ].filter((r) => r.text && r.step < step);

  const first = a.name.trim().split(" ")[0];
  const badPostcode = tried && !postcodeOk(a.postcode);
  const badName = tried && !a.name.trim();
  const badPhone = tried && !phoneOk(a.phone);

  return (
    <section id="survey" className="enquire-section" data-reveal>
      {/* Bookends the hero: same stepped courses, mirrored, stepping down towards the form */}
      <div className="enquire__media">
        <div className="enquire__img">
          <Image
            src="/images/form-gable.jpg"
            alt="Slate gable and dormer under a grey sky"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
        <div className="enquire__plate r" data-reveal>
          <span className="enquire__plate-label">Rather talk it through?</span>
          <a className="enquire__phone" href={PHONE_HREF}>
            {PHONE}
          </a>
          <p className="enquire__hours">{HOURS}</p>
        </div>
      </div>

      <div className="wrap enquire">
        <div className="enquire__intro">
          <WordsHeading before="Book a free roof" em="survey" after="." />
          <p className="enquire__lede r" data-reveal>
            Four quick questions. We&rsquo;ll call back the same working day to arrange a time.
          </p>
        </div>

        <div className="wizard r" data-reveal>
          {!sent && (
            <div className="wizard__top">
              {/* Progress as four rising courses, echoing the roofline */}
              <ol className="wizard__progress" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
                {STEPS.map((s, i) => (
                  <li key={s} data-state={i < step ? "done" : i === step ? "current" : "todo"}>
                    <span />
                  </li>
                ))}
              </ol>
              <p className="wizard__where">
                <span>
                  {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                </span>
                {STEPS[step]}
              </p>
            </div>
          )}

          {!sent && recap.length > 0 && (
            <div className="wizard__recap">
              {recap.map((r) => (
                <button key={r.step} type="button" onClick={() => go(r.step)}>
                  {r.text}
                  <span className="sr-only"> (change)</span>
                </button>
              ))}
            </div>
          )}

          <div className="wizard__panel" key={sent ? "sent" : step} style={{ "--dir": dir } as CSSProperties}>
            {sent ? (
              <div className="wizard__done" role="status">
                <h3 ref={titleRef} tabIndex={-1}>
                  Thanks{first ? `, ${first}` : ""}.
                </h3>
                <p>
                  We&rsquo;ll ring {a.phone} today to arrange your survey. If it&rsquo;s urgent, call
                  us on <a href={PHONE_HREF}>{PHONE}</a>.
                </p>
                <dl>
                  <div>
                    <dt>Problem</dt>
                    <dd>{a.problem}</dd>
                  </div>
                  <div>
                    <dt>When</dt>
                    <dd>{a.urgency}</dd>
                  </div>
                  <div>
                    <dt>Postcode</dt>
                    <dd>{a.postcode}</dd>
                  </div>
                </dl>
              </div>
            ) : step === 0 ? (
              <>
                <h3 className="wizard__q" ref={titleRef} tabIndex={-1}>
                  What&rsquo;s going on with the roof?
                </h3>
                <Choices label="The problem" options={PROBLEMS} value={a.problem} onPick={(v) => pick("problem", v)} />
              </>
            ) : step === 1 ? (
              <>
                <h3 className="wizard__q" ref={titleRef} tabIndex={-1}>
                  How soon do you need us?
                </h3>
                <Choices label="How soon" options={URGENCY} value={a.urgency} onPick={(v) => pick("urgency", v)} />
                <div className="wizard__nav">
                  <button type="button" className="textlink" onClick={() => go(0)}>
                    Back
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              <form onSubmit={onHouse} noValidate>
                <h3 className="wizard__q" ref={titleRef} tabIndex={-1}>
                  Where&rsquo;s the house?
                </h3>
                <div className="wizard__fields">
                  <div className="field" data-invalid={badPostcode}>
                    <label htmlFor="f-postcode">Postcode</label>
                    <input
                      id="f-postcode"
                      name="postcode"
                      autoComplete="postal-code"
                      autoCapitalize="characters"
                      placeholder="RH2 9AB"
                      value={a.postcode}
                      onChange={set("postcode")}
                      aria-invalid={badPostcode}
                      aria-describedby="f-postcode-msg"
                    />
                    <span id="f-postcode-msg" className="field__msg">
                      {badPostcode ? "That doesn't look like a full postcode." : ""}
                    </span>
                  </div>
                  <div className="field">
                    <label htmlFor="f-notes">Anything else (optional)</label>
                    <textarea
                      id="f-notes"
                      name="notes"
                      rows={2}
                      placeholder="Where the leak shows, how old the roof is, anything already done"
                      value={a.notes}
                      onChange={set("notes")}
                    />
                  </div>
                  <div className="field field--upload">
                    <span className="field__label">Photos (optional)</span>
                    <label className="upload">
                      <input
                        type="file"
                        name="photos"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          setA((p) => ({ ...p, files: Array.from(e.target.files ?? []).map((f) => f.name) }))
                        }
                      />
                      <span className="upload__btn">Choose photos</span>
                      <span className="upload__hint">
                        {a.files.length ? a.files.join(", ") : "Taken from the ground or a window is fine."}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="wizard__nav">
                  <button type="button" className="textlink" onClick={() => go(1)}>
                    Back
                  </button>
                  <button type="submit" className="btn">
                    Continue
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={onDetails} noValidate>
                <h3 className="wizard__q" ref={titleRef} tabIndex={-1}>
                  Who should we call?
                </h3>
                <div className="wizard__fields wizard__fields--pair">
                  <div className="field" data-invalid={badName}>
                    <label htmlFor="f-name">Name</label>
                    <input
                      id="f-name"
                      name="name"
                      autoComplete="name"
                      value={a.name}
                      onChange={set("name")}
                      aria-invalid={badName}
                      aria-describedby="f-name-msg"
                    />
                    <span id="f-name-msg" className="field__msg">
                      {badName ? "Who should we ask for?" : ""}
                    </span>
                  </div>
                  <div className="field" data-invalid={badPhone}>
                    <label htmlFor="f-phone">Phone</label>
                    <input
                      id="f-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={a.phone}
                      onChange={set("phone")}
                      aria-invalid={badPhone}
                      aria-describedby="f-phone-msg"
                    />
                    <span id="f-phone-msg" className="field__msg">
                      {badPhone ? "A number we can ring back on, please." : ""}
                    </span>
                  </div>
                </div>
                <div className="wizard__nav">
                  <button type="button" className="textlink" onClick={() => go(2)}>
                    Back
                  </button>
                  <button type="submit" className="btn">
                    Request survey
                  </button>
                </div>
                <p className="wizard__small">We only use your details to arrange the survey.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
