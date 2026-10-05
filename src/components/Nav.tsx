"use client";

import { useEffect, useState } from "react";
import { HOURS, NAV_LINKS, PHONE, PHONE_HREF } from "@/content";
import { order } from "@/lib/motion";

// Not sticky: the header sits at the top of the page and scrolls away with it.
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="wordmark" onClick={close}>
          Whitecombe Roofing
        </a>

        <nav className="nav__links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__phone" href={PHONE_HREF}>
            {PHONE}
          </a>
          <a className="btn btn--sm" href="#survey">
            Book a free survey
          </a>
        </div>

        <div className="nav__mobile">
          <a className="nav__call" href={PHONE_HREF}>
            Call
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="menu" data-open={open} aria-hidden={!open}>
        <nav className="menu__links" aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              style={order(i)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot" style={order(NAV_LINKS.length)}>
          <a className="btn btn--block" href="#survey" onClick={close} tabIndex={open ? 0 : -1}>
            Book a free survey
          </a>
          <a className="menu__phone" href={PHONE_HREF} tabIndex={open ? 0 : -1}>
            {PHONE}
          </a>
          <p className="menu__hours">{HOURS}</p>
        </div>
      </div>
    </header>
  );
}
