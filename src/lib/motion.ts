import type { CSSProperties } from "react";

// Position of an item within a revealing group; drives its stagger delay in CSS.
export const order = (i: number) => ({ "--i": i }) as CSSProperties;
