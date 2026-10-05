"use client";

import { useEffect } from "react";

// Marks every [data-reveal] element with [data-visible] the first time it
// scrolls into view. Elements that arrive in the same batch get a --stagger
// index so they cascade instead of landing at once. Fires once per element.
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const show = (el: HTMLElement, order: number) => {
      el.style.setProperty("--stagger", String(Math.min(order, 4)));
      el.setAttribute("data-visible", "");
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => show(el, 0));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )
          .forEach((e, order) => {
            show(e.target as HTMLElement, order);
            io.unobserve(e.target);
          });
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
