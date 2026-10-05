import Image from "next/image";
import { PHONE, PHONE_HREF } from "@/content";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__line">
              <span className="hero__caps">Every layer,</span>
            </span>
            <span className="hero__line">
              <span className="hero__serif">done properly.</span>
            </span>
          </h1>
          <p className="hero__sub">
            Full reroofs, repairs and leadwork for period and family homes. One written price, a
            15&#8209;year insurance-backed guarantee, and the same crew from first tile to last.
          </p>
          <div className="hero__ctas">
            <a className="btn" href="#survey">
              Book a free roof survey
            </a>
            <a className="textlink" href={PHONE_HREF}>
              Or call {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Stepped mask rises lower-left to upper-right, like a roofline. */}
      <div className="hero__media">
        <Image
          src="/images/hero.jpg"
          alt="Two roofers fixing slates near the ridge of a house"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 52vw"
        />
      </div>
    </section>
  );
}
