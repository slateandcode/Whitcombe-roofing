import Image from "next/image";
import type { CSSProperties } from "react";
import { MAP, MAP_TOWNS, YARD } from "@/content";

const RINGS = [5, 10];
// The overlay SVG uses map-width percentages on both axes.
const VIEW_H = (100 * MAP.height) / MAP.width;
const yOf = (pct: number) => (pct / 100) * VIEW_H;

const pos = (x: number, y: number, i = 0) =>
  ({ left: `${x}%`, top: `${y}%`, "--i": i }) as CSSProperties;

// Full-bleed map of the patch. A real base map, with our own labels in the
// site's type, true-scale mile rings and routes drawn out from the yard.
export default function AreasMap() {
  return (
    <figure className="area-map" data-reveal>
      <div className="area-map__stage">
        <div className="area-map__layer" style={{ aspectRatio: `${MAP.width} / ${MAP.height}` }}>
          <Image
            className="area-map__base"
            src={MAP.src}
            alt=""
            fill
            sizes="(max-width: 900px) 260vw, 100vw"
          />

          <svg className="area-map__lines" viewBox={`0 0 100 ${VIEW_H}`} aria-hidden>
            {RINGS.map((m, i) => (
              <circle
                key={m}
                className="area-map__ring"
                cx={YARD.x}
                cy={yOf(YARD.y)}
                r={m * MAP.mile}
                style={{ "--i": i } as CSSProperties}
              />
            ))}
            {MAP_TOWNS.map((t, i) => (
              <line
                key={t.name}
                className="area-map__route"
                x1={YARD.x}
                y1={yOf(YARD.y)}
                x2={t.x}
                y2={yOf(t.y)}
                pathLength={1}
                style={{ "--i": i } as CSSProperties}
              />
            ))}
          </svg>

          {RINGS.map((m, i) => (
            <span
              key={m}
              className="area-map__ring-label"
              // On the ring, straight below the yard
              style={pos(YARD.x, YARD.y + ((m * MAP.mile) / VIEW_H) * 100, i)}
            >
              {m} miles
            </span>
          ))}

          {MAP_TOWNS.map((t, i) => (
            <span key={t.name} className="area-map__town" data-side={t.side} style={pos(t.x, t.y, i)}>
              <span className="area-map__label">{t.name}</span>
            </span>
          ))}

          <span className="area-map__yard" style={pos(YARD.x, YARD.y)}>
            <span className="area-map__plate">
              <strong>{YARD.name}</strong>
              <span>Our yard</span>
            </span>
          </span>
        </div>
      </div>
      <figcaption className="area-map__credit">{MAP.credit}</figcaption>
    </figure>
  );
}
