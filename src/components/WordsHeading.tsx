import type { CSSProperties } from "react";

type Props = {
  before?: string;
  em?: string;
  after?: string;
  className?: string;
  as?: "h2" | "h3";
};

type Word = { text: string; space: boolean };

const split = (s: string, leadingSpace: boolean): Word[] =>
  s
    .split(" ")
    .filter(Boolean)
    .map((text, i) => ({ text, space: i > 0 || leadingSpace }));

// Section heading whose words fade up one after another when it scrolls into
// view. The emphasised phrase stays in one <em> so it never breaks apart.
export default function WordsHeading({ before = "", em, after = "", className = "heading", as: Tag = "h2" }: Props) {
  const lead = split(before, false);
  const italic = em ? split(em, lead.length > 0) : [];
  // Punctuation straight after the emphasis hugs it, words get a space.
  const tail = split(after, !/^[.,;:!?’”]/.test(after));

  let n = 0;
  const word = (w: Word) => {
    const i = n++;
    return (
      <span key={i}>
        {w.space ? " " : null}
        <span className="w" style={{ "--w": i } as CSSProperties}>
          {w.text}
        </span>
      </span>
    );
  };

  // Punctuation straight after the emphasis is kept on the same line as it.
  const hug = tail.length > 0 && !tail[0].space ? tail.slice(0, 1) : [];
  const rest = tail.slice(hug.length);

  return (
    <Tag className={className} data-reveal>
      {lead.map(word)}
      {italic.length > 0 && (
        <>
          {italic[0].space ? " " : null}
          <span className="nowrap">
            <em>{italic.map((w, i) => word({ ...w, space: i > 0 }))}</em>
            {hug.map(word)}
          </span>
        </>
      )}
      {rest.map(word)}
    </Tag>
  );
}
