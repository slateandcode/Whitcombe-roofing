// All copy and placeholder photography for the homepage.
// Photos in /public/images are Unsplash stand-ins; swap for Whitecombe's own
// job photography before launch (same filenames, similar crops).

export const PHONE = "01632 960 418";
export const PHONE_HREF = "tel:+441632960418";
export const HOURS = "Mon to Sat, 7:30am to 6pm";

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
];

// The rebuild is a scroll-scrubbed image sequence cut from
// /public/images/Before and After Vid.mp4 (107 frames). The 1216px source is
// upscaled to 1920 with Lanczos and lightly sharpened before AVIF encoding,
// so it holds up full-bleed on large and high-density screens.
// `stageStarts` marks where each stage begins in the footage (old roof,
// membrane and battens, tiling, finished). Each stage gets an equal share of
// the scroll, so the caption always matches what's on screen.
export const REBUILD_FRAMES = {
  count: 107,
  width: 1920,
  height: 1062,
  stageStarts: [0, 16, 60, 96],
  src: (i: number) => `/frames/rebuild/${String(i + 1).padStart(3, "0")}.avif`,
};

export const STAGES = [
  {
    num: "01",
    name: "Strip",
    body: "Old tiles off, battens off, back to the rafters. Rotten timber gets photographed and shown to you before anything is replaced.",
  },
  {
    num: "02",
    name: "Felt and batten",
    body: "Breathable membrane and treated battens, set out to the exact gauge for the tile.",
  },
  {
    num: "03",
    name: "Tile",
    body: "Handmade clay tiles, nailed every course, ridge fixed dry so it never needs repointing.",
  },
  {
    num: "04",
    name: "Done",
    body: "Leadwork dressed, gutters cleared, scaffold down. You walk the finished roof with us before we leave.",
  },
];

export const SERVICES = [
  {
    num: "01",
    name: "Full reroofs",
    body: "Stripped to the rafters and rebuilt in slate or clay, matched to the house and the street.",
    duration: "Typically 5 to 10 days",
    src: "/images/svc-reroof.jpg",
    alt: "Roofers laying new tiles across battens",
  },
  {
    num: "02",
    name: "Roof repairs",
    body: "Slipped tiles, storm damage, leaks traced to the source instead of patched where the stain shows.",
    duration: "Typically 1 day",
    src: "/images/svc-repairs.jpg",
    alt: "Roofer working on a slate roof beside a flue",
  },
  {
    num: "03",
    name: "Chimneys and leadwork",
    body: "Flashing, flaunching and repointing, dressed by hand in code 4 and 5 lead.",
    duration: "Typically 1 to 2 days",
    src: "/images/svc-chimney.jpg",
    alt: "Brick chimney stack above a clay tile roof",
  },
  {
    num: "04",
    name: "Flat roofs",
    body: "GRP and EPDM for extensions, dormers and garages, laid in one piece with no seams to fail.",
    duration: "Typically 1 to 3 days",
    src: "/images/svc-flat.jpg",
    alt: "Flat roof seen from above",
  },
  {
    num: "05",
    name: "Fascias, soffits and guttering",
    body: "Rotten timber replaced, uPVC fitted, gutters set to the right fall.",
    duration: "Typically 1 to 2 days",
    src: "/images/svc-fascia.jpg",
    alt: "New fascia board and black guttering under a gable",
  },
];

// Corners most firms cut, ordered by how long each takes to show itself.
export const CORNERS = [
  {
    when: "The first winter",
    what: "Tiles hung, not nailed.",
    then: "The first proper storm lifts them.",
  },
  {
    when: "Two or three years in",
    what: "Flashing tape instead of lead.",
    then: "It peels, and rain runs in behind the chimney.",
  },
  {
    when: "Five to ten years in",
    what: "Old battens left in place.",
    then: "They rot quietly under the new tiles you paid for.",
  },
  {
    when: "Ten years on",
    what: "Felt with no ventilation.",
    then: "Condensation soaks the rafters from the inside.",
  },
];

export const WORK = [
  {
    town: "Reigate",
    house: "Edwardian detached",
    job: "full reroof, handmade clay",
    src: "/images/work-reigate.jpg",
    alt: "Edwardian detached house with a new handmade clay tile roof",
  },
  {
    town: "Dorking",
    house: "Victorian semi",
    job: "natural slate reroof",
    src: "/images/work-dorking.jpg",
    alt: "Natural slate roof with gabled dormers",
  },
  {
    town: "Epsom",
    house: "1930s detached",
    job: "chimney rebuild and leadwork",
    src: "/images/work-epsom.jpg",
    alt: "Rebuilt brick chimney stack with new leadwork",
  },
  {
    town: "Guildford",
    house: "barn conversion",
    job: "Welsh slate",
    src: "/images/work-guildford-barn.jpg",
    alt: "Barn conversion with a Welsh slate roof",
  },
  {
    town: "Banstead",
    house: "rear extension",
    job: "GRP flat roof",
    src: "/images/work-banstead.jpg",
    alt: "Rear extension with a new GRP flat roof",
  },
];

export const SURVEY_STEPS = [
  {
    num: "01",
    lead: "We come out.",
    body: "Usually within the week. Drone photos of every slope, so nobody climbs up to guess.",
  },
  {
    num: "02",
    lead: "You get a written report.",
    body: "Photos, what's wrong, what isn't, and what can wait.",
  },
  {
    num: "03",
    lead: "One fixed price.",
    body: "If you go ahead, that's the number. If you don't, keep the report.",
  },
];

export const REVIEWS = [
  {
    quote:
      "Two other firms told me it needed a full reroof. Whitecombe went up, found three slipped tiles and a split lead valley, and fixed both in a morning.",
    name: "Helen T.",
    town: "Reigate",
    job: "roof repair",
  },
  {
    quote:
      "They sent photos every evening, including the rotten rafter they found on day two. The price didn't move.",
    name: "Mark D.",
    town: "Dorking",
    job: "full reroof",
  },
  {
    quote:
      "The scaffold was down and the drive swept before I got home. You'd never know they'd been.",
    name: "Priya S.",
    town: "Epsom",
    job: "chimney and leadwork",
  },
];

// Areas map: /public/images/map-surrey.jpg is a stitched Web Mercator
// base map (Esri Light Gray Canvas). Positions are % of the image; one mile
// is 1.885% of its width at this latitude.
export const MAP = {
  src: "/images/map-surrey.jpg",
  width: 3568,
  height: 1489,
  mile: 1.885,
  credit: "Base map: Esri, HERE, Garmin, © OpenStreetMap contributors",
};
export const YARD = { name: "Reigate", x: 63.6, y: 50.95 };
export type Side = "n" | "s" | "e" | "w";
export const MAP_TOWNS: { name: string; x: number; y: number; side: Side }[] = [
  { name: "Redhill", x: 66.53, y: 50.08, side: "e" },
  { name: "Dorking", x: 53.47, y: 52.58, side: "s" },
  { name: "Epsom", x: 58.53, y: 20.05, side: "n" },
  { name: "Banstead", x: 63.67, y: 24.44, side: "e" },
  { name: "Leatherhead", x: 53.55, y: 32.57, side: "w" },
  { name: "Guildford", x: 33.85, y: 51.27, side: "s" },
  { name: "Cobham", x: 46.86, y: 22.24, side: "n" },
  { name: "Horley", x: 66.37, y: 70.69, side: "e" },
];

export const TOWNS = [
  "Reigate",
  "Redhill",
  "Dorking",
  "Epsom",
  "Banstead",
  "Leatherhead",
  "Guildford",
  "Cobham",
  "Horley",
];

export const FAQS = [
  {
    q: "Do I need a full reroof or just repairs?",
    a: "More often than not, repairs. If the tiles are sound and the battens aren't rotten, a reroof is money you don't need to spend. The survey report shows you which it is, with photos, so you're not taking our word for it.",
  },
  {
    q: "What happens if it rains mid-job?",
    a: "We only strip what we can cover the same day. Anything open is sheeted and battened down before we leave, and if the weather turns overnight, one of us comes back to check it.",
  },
  {
    q: "Do you work with insurers on storm damage?",
    a: "Yes. We photograph the damage, write the report your insurer asks for and speak to the loss adjuster directly if needed. If it's urgent, we make the roof watertight first and sort the paperwork after.",
  },
  {
    q: "How long does a full reroof take?",
    a: "Typically five to ten working days for a family home, depending on size, access and the tile. You get a start date and an expected finish in writing with your price.",
  },
  {
    q: "Do I need to be home while you work?",
    a: "No. Most of our customers are at work. We need access to the garden and an outside tap, and we send photos at the end of each day so you can see where we're up to.",
  },
];

export const PROBLEMS = [
  { label: "Leak", hint: "Water coming in, or a stain spreading on a ceiling" },
  { label: "Slipped or missing tiles", hint: "Tiles on the lawn, or gaps you can see from the street" },
  { label: "Storm damage", hint: "Something moved in the wind or came down" },
  { label: "Chimney", hint: "Loose pots, cracked flaunching, damp on the chimney breast" },
  { label: "Flat roof", hint: "An extension, dormer or garage roof pooling or leaking" },
  { label: "Full reroof", hint: "The roof is past patching, or you're planning ahead" },
  { label: "Not sure", hint: "Something doesn't look right. We'll find out what." },
];

export const URGENCY = [
  { label: "It's letting water in now", hint: "We'll make it watertight first and talk after" },
  { label: "In the next few weeks", hint: "Something's wrong, but it's holding for now" },
  { label: "I'm planning ahead", hint: "Budgeting for work this year or next" },
  { label: "I just want it checked", hint: "Buying, selling, or peace of mind" },
];
