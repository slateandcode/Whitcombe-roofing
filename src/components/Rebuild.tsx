"use client";

import { useEffect, useRef, useState } from "react";
import { REBUILD_FRAMES, STAGES } from "@/content";

const { count: COUNT, src: frameSrc, stageStarts } = REBUILD_FRAMES;
const STAGE_BOUNDS = [...stageStarts, COUNT - 1];

// Scroll progress (0–1) to a frame position: each stage owns an equal slice
// of the scroll and plays its own stretch of footage across it.
function frameAt(progress: number) {
  const stages = stageStarts.length;
  const s = Math.min(stages - 1, Math.floor(progress * stages));
  const local = progress * stages - s;
  return STAGE_BOUNDS[s] + local * (STAGE_BOUNDS[s + 1] - STAGE_BOUNDS[s]);
}
const PARALLEL = 6;
// How quickly the drawn frame catches up with the scroll position (per 60fps
// frame). Low enough to smooth out wheel steps, high enough to feel direct.
const CATCH_UP = 0.2;

// How far the pinned stage can travel inside the section, and where it sticks.
function measure(section: HTMLElement, pin: HTMLElement) {
  const stickTop = parseFloat(getComputedStyle(pin).top) || 0;
  return { stickTop, travel: section.offsetHeight - pin.offsetHeight };
}

// Coarse to fine: first and last frame, then every 16th, 8th, 4th... so the
// whole scrub works early and simply gets smoother as frames arrive.
function loadOrder(n: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const i of [0, n - 1]) {
    seen.add(i);
    order.push(i);
  }
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < n; i += step) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

// Draw like object-fit: cover, centred.
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

// Pinned, scroll-scrubbed footage of one reroof. The section is four
// viewports tall; the stage sticks and scroll position picks the frame.
export default function Rebuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!section || !pin || !canvas || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frames: (HTMLImageElement | null)[] = new Array(COUNT).fill(null);
    let target = 0; // frame the scroll position asks for
    let shown = 0; // frame position being eased towards it
    let drawn = -1; // frame actually on the canvas
    let raf = 0;
    let last = 0;
    let started = false;
    let cancelled = false;

    // Nearest frame that has loaded, searching outwards from the one wanted.
    const nearest = (i: number) => {
      for (let d = 0; d < COUNT; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };

    const paint = (force = false) => {
      const i = nearest(Math.round(shown));
      if (i < 0 || (i === drawn && !force)) return;
      drawCover(ctx, frames[i]!, canvas.width, canvas.height);
      drawn = i;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(64, now - last) : 16.67;
      last = now;
      const k = reduce ? 1 : 1 - Math.pow(1 - CATCH_UP, dt / 16.67);
      shown += (target - shown) * k;
      if (Math.abs(target - shown) < 0.02) shown = target;
      paint();
      if (shown !== target) raf = requestAnimationFrame(tick);
      else last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const { stickTop, travel } = measure(section, pin);
      const scrolled = stickTop - section.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(1, Math.max(0, scrolled / travel)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setActive(Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length)));
      target = frameAt(progress);
      kick();
    };

    // Canvas backing store tracks its CSS size (DPR capped at 2).
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      paint(true);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Fetch frames a few at a time, coarse to fine.
    const start = () => {
      if (started) return;
      started = true;
      const queue = loadOrder(COUNT);
      const next = () => {
        const i = queue.shift();
        if (i === undefined || cancelled) return;
        const img = new Image();
        img.decoding = "async";
        img.src = frameSrc(i);
        img
          .decode()
          .then(() => {
            if (cancelled) return;
            frames[i] = img;
            if (drawn < 0) setReady(true);
            // Repaint if this frame is closer to what's wanted than what's shown
            if (drawn < 0 || Math.abs(i - shown) < Math.abs(drawn - shown)) paint(true);
          })
          .catch(() => {})
          .finally(next);
      };
      for (let k = 0; k < PARALLEL; k++) next();
    };

    // Start loading well before the section arrives.
    const io = new IntersectionObserver(([e]) => e.isIntersecting && start(), {
      rootMargin: "150% 0px",
    });
    io.observe(section);

    onScroll();
    shown = target;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const el = sectionRef.current;
    const pin = pinRef.current;
    if (!el || !pin) return;
    const { stickTop, travel } = measure(el, pin);
    const start = el.getBoundingClientRect().top + window.scrollY - stickTop;
    window.scrollTo({ top: start + travel * ((i + 0.5) / STAGES.length), behavior: "smooth" });
  };

  return (
    <section id="process" className="rebuild" ref={sectionRef} aria-label="How a reroof goes, in four stages">
      <div className="rebuild__pin" ref={pinRef}>
        {/* First frame shows until the sequence has loaded */}
        <img className="rebuild__poster" src={frameSrc(0)} alt="" aria-hidden />
        <canvas
          ref={canvasRef}
          className="rebuild__canvas"
          data-ready={ready}
          role="img"
          aria-label="The same house being reroofed, from the old mossy roof, through membrane and battens, to new clay tiles"
        />

        <div className="rebuild__content r" data-reveal>
          <ol className="rebuild__tabs">
            {STAGES.map((s, i) => (
              <li key={s.num}>
                <button
                  type="button"
                  data-active={i === active}
                  aria-current={i === active ? "step" : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="rebuild__num">{s.num}</span>
                  {s.name}
                </button>
              </li>
            ))}
          </ol>
          <div className="rebuild__bodies" aria-live="polite">
            {STAGES.map((s, i) => (
              <p key={s.num} data-active={i === active} aria-hidden={i !== active}>
                {s.body}
              </p>
            ))}
          </div>
        </div>

        <div className="rebuild__progress" aria-hidden>
          <span ref={barRef} />
        </div>
      </div>
    </section>
  );
}
