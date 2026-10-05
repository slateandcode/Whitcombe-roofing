"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SERVICES } from "@/content";
import WordsHeading from "./WordsHeading";

const COUNT = SERVICES.length;
// The deck is the five services twice over, so a card can wrap from one end
// to the other while it's off screen instead of flying across the middle.
const RING = COUNT * 2;
const INTERVAL = 4200;
const SWIPE = 40;

// Slot geometry from the Figma frame: cards sit apart with an even gap
// (no overlap, so none has to jump in front of another mid-slide).
// Scales: centre 1, neighbours 0.9, outer 0.73. Offsets are card-centre
// distances in card widths: half of each card + GAP between them.
const GAP = 0.07;
const SLOT_SCALE = [1, 0.9, 0.73, 0.6, 0.6];
const SLOT_X = SLOT_SCALE.reduce<number[]>((xs, s, i) => {
  if (i === 0) return [0];
  const prev = xs[i - 1];
  return [...xs, prev + SLOT_SCALE[i - 1] / 2 + GAP + s / 2];
}, []);

const norm = (d: number) => {
  const m = ((d % RING) + RING) % RING;
  return m > RING / 2 ? m - RING : m;
};

function slotStyle(d: number, jump: boolean): CSSProperties {
  const k = Math.min(Math.abs(d), SLOT_X.length - 1);
  const x = Math.sign(d) * SLOT_X[k];
  return {
    transform: `translateX(calc(-50% + var(--card-w) * ${x})) scale(${SLOT_SCALE[k]})`,
    zIndex: 10 - Math.abs(d),
    // A card wrapping round the back of the ring snaps instead of sliding.
    transition: jump ? "none" : undefined,
  };
}

export default function ServicesCarousel() {
  const [pos, setPos] = useState({ active: 0, prev: 0 });
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const swipeX = useRef<number | null>(null);
  const swiped = useRef(false);

  const go = useCallback((step: number) => {
    setPos((p) => ({ active: (((p.active + step) % RING) + RING) % RING, prev: p.active }));
  }, []);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Only run while the carousel is actually on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = inView && !paused && !reduced;

  // Restarts whenever the slide changes, so a manual step gets a full interval.
  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      if (document.visibilityState === "visible") go(1);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [playing, pos.active, go]);

  const service = pos.active % COUNT;

  return (
    <section
      id="services"
      className="whatwedo"
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="What we do"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="wrap whatwedo__head">
        <WordsHeading before="What we" em="do" after="." />
        <div className="whatwedo__controls r" data-reveal>
          <span className="whatwedo__count" aria-hidden>
            {String(service + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
          </span>
          <button type="button" className="whatwedo__arrow whatwedo__arrow--prev" onClick={() => go(-1)}>
            <span className="sr-only">Previous service</span>
          </button>
          <button type="button" className="whatwedo__arrow" onClick={() => go(1)}>
            <span className="sr-only">Next service</span>
          </button>
        </div>
      </div>

      <div
        className="carousel"
        data-reveal
        onPointerDown={(e) => {
          swipeX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          swiped.current = Math.abs(dx) > SWIPE;
          if (swiped.current) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          swipeX.current = null;
        }}
      >
        {Array.from({ length: RING }, (_, i) => {
          const s = SERVICES[i % COUNT];
          const d = norm(i - pos.active);
          const jump = Math.abs(d - norm(i - pos.prev)) > RING / 2;
          const visible = Math.abs(d) <= 2;
          return (
            <div
              key={i}
              className="carousel__card"
              data-active={d === 0}
              style={slotStyle(d, jump)}
              aria-hidden={d !== 0}
              onClick={() => {
                // The click that ends a swipe shouldn't also select a card.
                if (swiped.current) return void (swiped.current = false);
                if (visible && d !== 0) go(d);
              }}
            >
              <Image src={s.src} alt={d === 0 ? s.alt : ""} fill sizes="(max-width: 900px) 70vw, 460px" />
            </div>
          );
        })}
      </div>

      <div className="wrap whatwedo__captions" aria-live={playing ? "off" : "polite"}>
        {SERVICES.map((s, i) => (
          <div key={s.num} className="whatwedo__caption" data-active={i === service} aria-hidden={i !== service}>
            <h3>
              <span className="whatwedo__num">{s.num}</span>
              {s.name}
            </h3>
            <p>{s.body}</p>
            <span className="whatwedo__time">{s.duration}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
