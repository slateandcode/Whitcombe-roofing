import ScrollWords from "./ScrollWords";

export default function Setup() {
  return (
    <section className="setup">
      <div className="wrap">
        <ScrollWords
          className="setup__statement"
          text="Most roofs we’re called out to aren’t failing. They were just done cheap the first time."
        />
        <p className="setup__note r" data-reveal>
          Here&rsquo;s what doing it properly looks like. Keep scrolling.
        </p>
      </div>
    </section>
  );
}
