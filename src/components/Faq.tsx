"use client";

import { useState } from "react";
import { FAQS } from "@/content";
import { order } from "@/lib/motion";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="faq" data-reveal>
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="faq__item r" style={order(i)} data-open={isOpen}>
            <h3>
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <span className="faq__mark" aria-hidden />
              </button>
            </h3>
            <div
              id={`faq-a-${i}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
              className="faq__answer"
              inert={!isOpen}
            >
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
