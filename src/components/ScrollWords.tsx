"use client";

import { Fragment, useEffect, useRef } from "react";

const DIM = 0.18;
const SOFTNESS = 3; // how many words the fade front spans

// Paragraph whose words fill in from dim to full as it scrolls through the
// viewport. Scroll-linked, so it reads at the visitor's own pace.
export default function ScrollWords({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "blockquote";
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));
    const last = new Array<number>(spans.length).fill(-1);
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const { top, height } = el.getBoundingClientRect();
      // 0 when the top reaches 85% down the viewport, 1 when the bottom passes 50%
      const start = vh * 0.85;
      const progress = Math.min(1, Math.max(0, (start - top) / (start - vh * 0.5 + height)));
      const front = progress * (spans.length + SOFTNESS);

      spans.forEach((span, i) => {
        const t = Math.min(1, Math.max(0, (front - i) / SOFTNESS));
        const opacity = Math.round((DIM + (1 - DIM) * t) * 100) / 100;
        if (opacity !== last[i]) {
          span.style.opacity = String(opacity);
          last[i] = opacity;
        }
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Only listen while the paragraph is anywhere near the viewport.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
        update();
      }
    });

    io.observe(el);
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Tag ref={ref as never} className={`words ${className ?? ""}`}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span data-word>{w}</span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
