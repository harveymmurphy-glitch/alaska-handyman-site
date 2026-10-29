﻿﻿﻿import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HomeWorld from "./HomeWorld";
import { setupMobileMotion } from "./mobile-motion";
import {
  ArrowUpRight,
  ArrowDown,
  Phone,
  Mail,
  Menu,
  X,
  Plus,
  Minus,
  Hammer,
  PaintRoller,
  House,
  Wrench,
  Mountain,
  Check,
  Pause,
  Play,
  MoveHorizontal,
} from "lucide-react";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "lenis/dist/lenis.css";
import "./redesign.css";

gsap.registerPlugin(ScrollTrigger);
const PHONE = "tel:+19078915505",
  EMAIL = "info@arctichandymansevices.com";
const services = [
  {
    title: "Bathroom remodeling",
    icon: House,
    lead: "A bathroom that works beautifully — and feels brand new.",
    text: "Whether it's a vanity refresh, a full tile overhaul or a new bathtub, we plan bathroom renovations around what you actually use every day. We'll help you choose finishes that hold up to moisture and look great long-term.",
    tasks: ["Vanity & cabinet installation", "Faucets & drain upgrades", "Bathtub replacement", "Mosaic & ceramic tile", "Vinyl bathroom floors", "Mirror & lighting fixtures"],
    photo: "after",
  },
  {
    title: "Kitchen remodeling",
    icon: House,
    lead: "Make more of the heart of your home.",
    text: "From cabinet hardware and countertop upgrades to a fully reimagined layout, we help you plan kitchen renovations that improve flow, storage and daily comfort. Practical decisions, clean finishes, lasting results.",
    tasks: ["Cabinet hardware & pulls", "Countertop installation", "Backsplash tile", "Kitchen sink & faucet", "Appliance fit-out", "Storage & shelving"],
    photo: "craft-detail",
  },
  {
    title: "Flooring installation",
    icon: Hammer,
    lead: "A fresh foundation for every room in your home.",
    text: "Replace worn or dated flooring with vinyl plank, vinyl sheet or luxury vinyl tile. We handle subfloor prep, transitions, trim and cleanup so the final result is clean, level and built to last.",
    tasks: ["Vinyl plank (LVP)", "Vinyl sheet installation", "Luxury vinyl tile (LVT)", "Subfloor preparation", "Baseboards & transitions", "Flooring removal & disposal"],
    photo: "after1",
  },
  {
    title: "Drywall services",
    icon: Wrench,
    lead: "Smooth walls start with sound preparation.",
    text: "Drywall that's properly hung, taped and finished makes every paint job look better. We handle new installations, water-damaged panels, hole repairs and the critical tape-and-mud stages that determine your final finish.",
    tasks: ["New drywall installation", "Water damage repair", "Hole & crack patching", "Tape, mud & skim coat", "Texture matching", "Paint-ready finishing"],
    photo: "workshop",
  },
  {
    title: "Painting services",
    icon: PaintRoller,
    lead: "Refresh your space, inside and out.",
    text: "Interior and exterior painting done with proper prep — surfaces cleaned, patched, primed and finished with care. We also handle fence staining and deck coatings, matched to the material and the Anchorage climate.",
    tasks: ["Interior walls & ceilings", "Exterior siding & trim", "Cabinet painting", "Fence & deck staining", "Primer & prep work", "Trim & accent painting"],
    photo: "after1",
  },
  {
    title: "Carpentry & trim",
    icon: Hammer,
    lead: "Thoughtful woodwork. Lasting character.",
    text: "Finish carpentry and trim work that ties a room together — baseboards, door casings, crown moulding and built-in shelving. We also repair sticking doors and windows, and build custom woodwork for specific spaces.",
    tasks: ["Baseboards & door casings", "Crown moulding", "Built-in shelving", "Door & window repairs", "Custom woodwork", "Trim replacement"],
    photo: "craft-detail",
  },
  {
    title: "Deck services",
    icon: Hammer,
    lead: "Make the most of your outdoor space.",
    text: "Decks in Alaska take a beating from freeze-thaw cycles, UV exposure and moisture. We assess what your deck actually needs — whether that's a board replacement, structural repairs, a fresh coat of stain or a full remodel.",
    tasks: ["Deck board replacement", "Structural repairs", "Deck staining & sealing", "Railing repairs & replacement", "Post & beam repairs", "Full deck remodeling"],
    photo: "workshop",
  },
  {
    title: "Repairs & maintenance",
    icon: Wrench,
    lead: "Get the growing to-do list moving.",
    text: "Bring your list. Home repairs, fixture swaps, furniture and playground assembly, caulking, weatherstripping — the everyday work that keeps a home in good shape. We'll help you prioritize and plan the work together.",
    tasks: ["General home repairs", "Fixture installation & swaps", "Furniture assembly", "Playground & equipment assembly", "Caulking & weatherstripping", "Handyman punch lists"],
    photo: "workshop",
  },
  {
    title: "Plumbing repairs",
    icon: Wrench,
    lead: "Take care of the fixtures you rely on every day.",
    text: "Faucet replacements, drain repairs, shower panel installs and fixture upgrades handled with care. For each project we confirm scope and let you know if a licensed plumber is required before any work begins.",
    tasks: ["Faucet replacement", "Drain & trap repairs", "Shower panel installation", "Toilet repairs & replacement", "Shut-off valve replacement", "Under-sink work"],
    photo: "after",
  },
  {
    title: "Lighting & fans",
    icon: House,
    lead: "Make your space brighter and more comfortable.",
    text: "Swap outdated fixtures for ceiling fans, pendants, recessed lights or exterior fixtures. We confirm applicable licensing and project requirements before work begins so there are no surprises.",
    tasks: ["Ceiling fan installation", "Light fixture replacement", "Exterior light fixtures", "Under-cabinet lighting", "Dimmer & switch upgrades", "Minor electrical improvements"],
    photo: "after1",
  },
  {
    title: "Roof & gutter services",
    icon: House,
    lead: "Attention to your home’s first line of defence.",
    text: "Roof repairs, maintenance and gutter cleaning to protect your home from the Alaskan elements. Access, suitability and any required qualifications are confirmed for each project before scheduling.",
    tasks: ["Roof shingle repair", "Flashing repairs", "Roof maintenance inspection", "Gutter cleaning & flushing", "Gutter bracket & seal repair", "Ice dam prevention prep"],
    photo: "workshop",
  },
  {
    title: "Property maintenance",
    icon: Wrench,
    lead: "Practical, ongoing care for homes and businesses.",
    text: "Coordinate scheduled or on-call maintenance for residential and commercial properties in Anchorage. Ideal for landlords, property managers and business owners who need reliable, consistent upkeep.",
    tasks: ["Residential property maintenance", "Commercial property upkeep", "Seasonal maintenance plans", "Tenant turnover repairs", "Inspection & punch list work", "On-call repair service"],
    photo: "workshop",
  },
  {
    title: "Exterior cleaning",
    icon: Wrench,
    lead: "Give outdoor surfaces a clean start.",
    text: "Pressure washing for siding, driveways, walkways, decks and fences. The right pressure and technique for each surface — nothing blasted that shouldn’t be, nothing left behind that should be gone.",
    tasks: ["Siding pressure washing", "Driveway & walkway cleaning", "Deck & fence washing", "Concrete surface cleaning", "Mold & mildew removal", "Pre-paint surface prep"],
    photo: "workshop",
  },
];
function useMedia(query) {
  const [v, set] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const m = matchMedia(query),
      f = () => set(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, [query]);
  return v;
}
function Brand() {
  return (
    <a
      href="#home"
      className="brand"
      aria-label="Arctic Handyman Services LLC home"
    >
      <span className="brand-symbol">
        <img src="/assets/arctic-mark.svg" width="90" height="90" alt="" />
      </span>
      <span className="brand-name">
        ARCTIC<span>Handyman Services LLC</span>
      </span>
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false),
    [scrolled, setScrolled] = useState(false),
    trigger = useRef(null),
    mobile = useMedia("(max-width:900px)");
  useEffect(() => {
    if (!mobile) setOpen(false);
  }, [mobile]);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 60);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!open) return;
    const f = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, [open]);
  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="header-inner">
        <Brand />
        <nav
          id="navigation"
          className={open ? "is-open" : ""}
          aria-label="Main navigation"
          onClick={(e) => {
            if (e.target.closest("a")) setOpen(false);
          }}
        >
          <a href="#home-world">Explore in 3D</a>
          <a href="#services">Services</a>
          <a href="#our-work">Our work</a>
          <a href="#approach">Our approach</a>
          <a href="#contact" className="nav-mobile-contact">
            Start a project
          </a>
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={PHONE}>
            <Phone size={14} />
            (907) 891-5505
          </a>
          <a href="#contact" className="header-cta">
            Let’s talk <ArrowUpRight size={17} />
          </a>
          <button
            ref={trigger}
            className="menu-trigger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className="scroll-progress" />
    </header>
  );
}
function Film({
  source,
  poster,
  label,
  reduceMotion,
  priority = false,
  className = "",
}) {
  const ref = useRef(null),
    wanted = useRef(!reduceMotion),
    [paused, setPaused] = useState(reduceMotion),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    wanted.current = !reduceMotion;
    const v = ref.current;
    let visible = false;
    const update = () => {
      if (visible && wanted.current && !document.hidden)
        v.play().catch(() => setPaused(true));
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    document.addEventListener("visibilitychange", update);
    if (reduceMotion) {
      v.pause();
      setPaused(true);
    }
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [reduceMotion]);
  const toggle = () => {
    const v = ref.current;
    if (v.paused) {
      wanted.current = true;
      v.play().catch(() => setFailed(true));
    } else {
      wanted.current = false;
      v.pause();
    }
  };
  return (
    <div className={`film ${className}`}>
      <video
        ref={ref}
        src={`/assets/${source}.mp4`}
        poster={`/assets/${poster}.webp`}
        autoPlay={priority && !reduceMotion}
        muted
        loop
        playsInline
        preload={priority && !reduceMotion ? "auto" : "none"}
        aria-hidden="true"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onError={() => {
          setFailed(true);
          setPaused(true);
        }}
      />
      <button
        className="film-control"
        aria-label={`${paused ? "Play" : "Pause"} ${label}`}
        onClick={toggle}
        disabled={failed}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
        <span>
          {failed ? "Still image" : paused ? "Play film" : "Pause film"}
        </span>
      </button>
    </div>
  );
}
function Hero({ reduceMotion }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-film">
        <Film
          source="mobilehero"
          poster="mobile-poster"
          label="woodworking film"
          reduceMotion={reduceMotion}
          priority
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-content page-width">
        <p className="hero-location">
          <span>✳</span> Home & business improvements in Anchorage
        </p>
        <h1 id="hero-title">
          <span className="mask">
            <span>Built right.</span>
          </span>
          <span className="mask">
            <span>Feels like home.</span>
          </span>
        </h1>
        <div className="hero-details">
          <p>
            From the repair you keep putting off
            <br />
            to the room you can’t stop imagining.
            <br /> Let’s make it happen.
          </p>
          <a href="#contact" className="button button-paper">
            Tell us about your project <ArrowUpRight size={21} />
          </a>
        </div>
      </div>
      <div className="hero-foot page-width">
        <a className="explore-link" href="#home-world">
          <span className="circle-arrow">
            <ArrowDown size={20} />
          </span>
          Explore a home in 3D
        </a>
        <span className="hero-foot-note">
          Practical skills. A personal touch.
        </span>
        <span className="hero-place">
          Arctic Handyman Services LLC <span>907</span>
        </span>
      </div>
      <div className="hero-vertical" aria-hidden="true">
        Built for a stronger tomorrow
      </div>
    </section>
  );
}
function Introduction() {
  return (
    <section className="intro page-width" aria-labelledby="intro-title">
      <div className="intro-left">
        <span className="small-label">A better place to come home to</span>
        <div className="intro-cross" aria-hidden="true">
          ✳
        </div>
      </div>
      <div className="intro-right">
        <h2 id="intro-title" className="reading-heading">
          You see the potential.
          <br />
          We help you bring it home.
        </h2>
        <div className="intro-description">
          <p>
            From bathroom and kitchen remodeling to flooring, painting,
            drywall and everyday repairs, Kostiantyn and Arctic Handyman
            Services LLC give Anchorage homeowners and businesses a reliable
            partner for every stage of a project — from the first idea to
            the finished room.
          </p>
          <a href="#services" className="text-link">
            Find your service <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
function Services({ chooseService, reduceMotion }) {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(0);
  const toggleService = (index) => {
    setActive((current) => current === index ? null : index);
    if (active !== index) setPreview([2, 3, 4, 5].includes(index) ? 1 : 0);
  };
  return (
    <section className="services-section" id="services">
      <div className="page-width">
        <div className="section-top">
          <span className="small-label">What needs doing?</span>
          <p>Residential & commercial · Anchorage, Alaska</p>
        </div>
        <div className="services-layout">
          <div className="service-list">
            {services.map((s, i) => (
              <article
                key={s.title}
                className={`service ${active === i ? "active" : ""}`}
              >
                <h3>
                  <button
                    onClick={() => toggleService(i)}
                    aria-expanded={active === i}
                    aria-controls={`service-panel-${i}`}
                  >
                    <span>{s.title}</span>
                    <span className="service-symbol">
                      {active === i ? <Minus size={21} /> : <Plus size={21} />}
                    </span>
                  </button>
                </h3>
                <div
                  className="service-panel"
                  id={`service-panel-${i}`}
                  hidden={active !== i}
                >
                  <p className="service-lead">{s.lead}</p>
                  <p>{s.text}</p>
                  <ul>
                    {s.tasks.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    onClick={() => chooseService(s.title)}
                    className="text-link"
                  >
                    Ask about this service <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <aside className="service-photo" aria-label="Service project comparison">
            <Comparison key={preview} project={projects[preview]} reduceMotion={reduceMotion} labelPrefix="Services preview: " />
            <div className="photo-note">
              <Hammer size={18} strokeWidth={1.4} />
              <span>From the first detail to the final finish.<small>Project example: {projects[preview].room}</small></span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
const projects = [
  {
    id: "bathroom",
    title: ["Same room.", "New perspective."],
    room: "The bathroom refresh",
    before: "before",
    after: "after",
    eyebrow: "Bathroom remodel · Anchorage",
    headline: "A dated vanity replaced with dark cabinetry, new fixtures and a floor that finally feels intentional.",
    text: "The original bathroom had the bones — a reasonable layout, decent light — but nothing that made it feel finished. Outdated cabinetry, worn fixtures and mismatched tile gave it that perpetually 'almost done' quality. We started with the vanity: swapped it for a dark-finished cabinet unit with brushed hardware and an undermount basin. New faucets, a framed mirror and updated lighting transformed the focal wall. Vinyl plank flooring replaced the old tile — warmer underfoot and far easier to maintain. The result is a bathroom that looks considered, clean and deliberate.",
    stats: [
      { value: "4", label: "days on site" },
      { value: "3", label: "trades coordinated" },
      { value: "100%", label: "material sourcing handled" },
    ],
    tags: ["Vanity installation", "Cabinet finishes", "Fixture upgrades", "Vinyl flooring", "Mirror & lighting", "Room refresh"],
  },
  {
    id: "living",
    title: ["A wall becomes", "the whole room."],
    room: "The living room transformation",
    before: "before1",
    after: "after1",
    eyebrow: "Finish carpentry & feature walls · Anchorage",
    headline: "Geometric accent walls and a full fireplace surround gave this living room a presence it never had.",
    text: "The living room was functional but flat — plain painted walls, an unfinished fireplace opening and no real focal point. The homeowner had a clear vision: something architectural, something with depth. We built a floor-to-ceiling fireplace surround with inset panelling and a thick mantel shelf, then carried the geometric wall treatment across the adjacent wall in a complementary pattern. Paint tied it together: deep tones in the feature panels, a lighter field colour to open the room. The change is total. Same footprint, completely different presence — one that looks like it was always meant to be this way.",
    stats: [
      { value: "7", label: "days on site" },
      { value: "Full", label: "design consultation" },
      { value: "Zero", label: "structural changes needed" },
    ],
    tags: ["Fireplace surround", "Finish carpentry", "Geometric accent walls", "Feature panelling", "Interior painting", "Mantel shelf"],
  },
];
function Comparison({ project: p, reduceMotion, labelPrefix = "" }) {
  const [v, set] = useState(48);
  const [activeBtn, setActiveBtn] = useState("compare");
  const wipe = useRef(null);
  useEffect(() => () => wipe.current?.kill(), [reduceMotion]);
  const moveTo = (value, btn) => {
    setActiveBtn(btn);
    wipe.current?.kill();
    if (reduceMotion) { set(value); return; }
    const progress = { value: v };
    wipe.current = gsap.to(progress, {
      value, duration: 0.75, ease: "power3.inOut",
      onUpdate: () => set(Math.round(progress.value)),
    });
  };
  return (
    <div className="project-comparison">
      <div className="comparison" style={{ "--split": `${v}%` }}>
        <img
          className="after-image"
          src={`/assets/${p.after}.webp`}
          alt={`${p.room}, after improvements`}
          width="1160"
          height="870"
          loading="lazy"
        />
        <img
          className="before-image"
          src={`/assets/${p.before}.webp`}
          alt={`${p.room}, before improvements`}
          width="1448"
          height="1086"
          loading="lazy"
        />
        <span
          className="image-label before-label"
          style={{ opacity: v < 8 ? 0 : 1 }}
        >
          Before
        </span>
        <span
          className="image-label after-label"
          style={{ opacity: v > 92 ? 0 : 1 }}
        >
          After
        </span>
        <div className="comparison-divider">
          <span>
            <MoveHorizontal size={22} />
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={v}
          onChange={(e) => { wipe.current?.kill(); setActiveBtn(null); set(Number(e.target.value)); }}
          aria-label={`${labelPrefix}Compare ${p.room}`}
          aria-valuetext={`${v}% before and ${100 - v}% after`}
        />
        <span className="drag-note">
          <MoveHorizontal size={13} />
          Move the slider. See the difference.
        </span>
      </div>
      <div className="comparison-tools">
        <span className="comparison-label">Original space → Finished space</span>
        <div className="comparison-btns">
          <button
            className={activeBtn === "before" ? "active" : ""}
            onClick={() => moveTo(100, "before")}
            aria-label={`${labelPrefix}Show before: ${p.room}`}
            aria-pressed={activeBtn === "before"}
          >
            Before
          </button>
          <button
            className={activeBtn === "compare" ? "active" : ""}
            onClick={() => moveTo(50, "compare")}
            aria-label={`${labelPrefix}Compare both: ${p.room}`}
            aria-pressed={activeBtn === "compare"}
          >
            Compare
          </button>
          <button
            className={activeBtn === "after" ? "active" : ""}
            onClick={() => moveTo(0, "after")}
            aria-label={`${labelPrefix}Show after: ${p.room}`}
            aria-pressed={activeBtn === "after"}
          >
            After
          </button>
        </div>
      </div>
    </div>
  );
}

function Work({ reduceMotion }) {
  return (
    <section className="work-section" id="our-work">
      <div className="page-width">
        <div className="work-heading">
          <span className="small-label">A closer look</span>
          <h2 className="reveal-title">
            Real spaces.
            <br />
            Real results.
          </h2>
          <p>
            Two Anchorage projects, before and after.
            <br />
            Drag the slider — see every detail.
          </p>
        </div>
        {projects.map((p, i) => (
          <article className={`project project-${i}`} key={p.id}>
            <div className="project-story">
              <span className="project-eyebrow">{p.eyebrow}</span>
              <h3>
                {p.title.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </h3>
              <p className="project-headline">{p.headline}</p>
              <p className="project-body">{p.text}</p>
              <div className="project-stats" aria-label="Project highlights">
                {p.stats.map((s) => (
                  <div key={s.label} className="project-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a
                href="#contact"
                className="project-cta"
                aria-label={`Start a project like ${p.room}`}
              >
                Start a similar project <ArrowUpRight size={17} />
              </a>
            </div>
            <Comparison project={p} reduceMotion={reduceMotion} />
          </article>
        ))}
      </div>
    </section>
  );
}
function AlpineScene({ reduceMotion }) {
  const host = useRef(null);
  useEffect(() => {
    if (reduceMotion) return;
    let dispose,
      cancelled = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import("./terrain.js")
          .then(({ createTerrain }) => {
            if (!cancelled) dispose = createTerrain(host.current);
          })
          .catch(() => {});
      },
      { rootMargin: "100px" },
    );
    io.observe(host.current);
    return () => {
      cancelled = true;
      io.disconnect();
      dispose?.();
    };
  }, [reduceMotion]);
  return (
    <div className="alpine-scene" ref={host} aria-hidden="true">
      <svg className="mountain-fallback" viewBox="0 0 600 400">
        <path
          d="M0 340 125 155 178 221 308 40 418 193 465 141 600 340Z"
          fill="#173a4b"
          stroke="#86adb9"
        />
        <path
          d="m178 221 130-181 110 153-57-27-30-58-23 41-25-27-55 114Z"
          fill="#bad7e6"
          opacity=".6"
        />
      </svg>
    </div>
  );
}
function Approach({ reduceMotion }) {
  return (
    <section className="approach-section" id="approach">
      <div className="page-width">
        <div className="approach-top">
          <div>
            <span className="small-label">Built around your home</span>
            <h2 className="reveal-title">
              Big on the
              <br />
              little things.
            </h2>
          </div>
          <p>
            A straight answer. A considered plan.
            <br />
            Attention to the parts you’ll live with every day.
            <br />
            <br />
            That’s where a better project begins.
          </p>
        </div>
        <div className="approach-grid">
          <Film
            source="hero"
            poster="hero-poster"
            className="care-film"
            label="home care film"
            reduceMotion={reduceMotion}
          />
          <div className="steps">
            {[
              {
                n: "01",
                title: "Show us what you have in mind.",
                text: "Send your list, location and a few photos. Describe what isn’t working and what you’d love to change. There’s no such thing as too much detail — it helps us plan more accurately from the start.",
              },
              {
                n: "02",
                title: "Let’s work out the details together.",
                text: "We’ll talk through scope, materials, timing and a realistic estimate. You’ll understand exactly what’s planned, what it will cost and what to expect on site. No guesswork, no surprises.",
              },
              {
                n: "03",
                title: "We bring your space together.",
                text: "Work begins once you’re confident in the plan. When it’s done, we walk through the details with you — because the finish matters as much as the foundation.",
              },
            ].map((s) => (
              <article key={s.n}>
                <span>{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="alaska-band">
        <div className="page-width alaska-band-inner">
          <span className="small-label">
            <Mountain size={19} />
            Anchorage is home.
          </span>
          <p>Let’s take care of yours.</p>
          <AlpineScene reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "What kinds of projects can I ask about?",
    "Repairs, painting, drywall, finish carpentry and room updates are a good place to start. Kitchen and bathroom remodels, flooring, deck work, lighting and property maintenance are all in scope. Share your project and we’ll confirm the scope, availability and whether specialist trades are needed before work begins.",
  ],
  [
    "How do I get an estimate?",
    "Call (907) 891-5505 or prepare an email request using the form below. Include your location, a description of the work and photos if you have them — the more detail the better. Some projects need an on-site visit before we can give a firm number.",
  ],
  [
    "Do you work in my area?",
    "We serve Anchorage, Alaska and the surrounding area. Share your project location when you get in touch and we’ll confirm availability before scheduling anything.",
  ],
  [
    "Can I combine several small repairs in one visit?",
    "Absolutely — send the whole list when you get in touch. Batching smaller repairs into a single visit is often more efficient and more cost-effective. It also makes it easier to plan the work and agree on timing upfront.",
  ],
  [
    "Do you work on commercial properties?",
    "Yes. We handle maintenance and repair work for commercial properties in Anchorage. If you manage a building or run a business, get in touch and we can discuss a maintenance plan that fits your schedule and budget.",
  ],
  [
    "How far in advance do I need to book?",
    "It depends on the season and project size. Smaller repairs can often be scheduled within a week or two. Larger remodels or projects with multiple trades may need more lead time. Call or send your project details and we’ll give you an honest timeline.",
  ],
];
function FAQ() {
  const [active, set] = useState(null);
  return (
    <section className="faq-section page-width">
      <div>
        <span className="small-label">Before we get started</span>
        <h2>Good to know.</h2>
        <p>
          Have something else in mind?
          <br />
          <a href={PHONE}>
            Give us a call <ArrowUpRight size={15} />
          </a>
        </p>
      </div>
      <div>
        {faqs.map(([q, a], i) => (
          <article className="faq-item" key={q}>
            <h3>
              <button
                aria-expanded={active === i}
                aria-controls={`answer-${i}`}
                onClick={() => set(active === i ? null : i)}
              >
                {q}
                {active === i ? <Minus size={19} /> : <Plus size={19} />}
              </button>
            </h3>
            <div id={`answer-${i}`} hidden={active !== i}>
              <p>{a}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Contact({ service, setService }) {
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");
  const [draft, setDraft] = useState(null),
    result = useRef(null);
  useEffect(() => setDraft(null), [service]);
  const prepare = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      text = `Hello Arctic Handyman Services LLC,\n\nI’d like to discuss a project.\n\nName: ${d.get("name").trim()}\nEmail: ${d.get("email").trim()}\nPhone: ${d.get("phone").trim() || "Not provided"}\nLocation: ${d.get("location").trim()}\nService: ${service || "Let’s discuss"}\n\nProject details:\n${d.get("details").trim()}\n\nPhotos to attach manually: ${photos.map(p => p.name).join(", ") || "None selected"}\n\nThank you!`;
    setDraft({
      text,
      url: `mailto:${EMAIL}?subject=${encodeURIComponent(`Project inquiry: ${service || "Home improvement"}`)}&body=${encodeURIComponent(text)}`,
    });
    requestAnimationFrame(() => result.current?.focus());
  };
  return (
    <section className="contact-section" id="contact">
      <div className="page-width contact-layout">
        <div className="contact-copy">
          <span className="small-label">Let’s get to work</span>
          <h2 className="reveal-title">
            Your next
            <br />
            “finally.”
            <ArrowUpRight aria-hidden="true" />
          </h2>
          <p>
            The repair. The refresh. The room you’ve been thinking about. Tell
            us where to start.
          </p>
          <a href={PHONE} className="contact-phone">
            (907) 891-5505 <ArrowUpRight size={24} />
          </a>
          <a href={`mailto:${EMAIL}`} className="contact-email">
            {EMAIL}
          </a>
          <div className="contact-mark">
            <Mountain size={27} strokeWidth={1.2} />
            <span>
              Arctic Handyman Services LLC
              <br />
              Built for a stronger tomorrow.
            </span>
          </div>
        </div>
        <div className="contact-form">
          <h3>Tell us about your project.</h3>
          <p>Start with a few details. We’ll take it from there.</p>
          <form onSubmit={prepare} onChange={() => draft && setDraft(null)}>
            <div className="form-grid">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="First and last name"
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  maxLength={160}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Phone <span>(optional)</span>
                <input
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  maxLength={40}
                  placeholder="(907) 000-0000"
                />
              </label>
              <label>
                Project location
                <input
                  name="location"
                  autoComplete="address-level2"
                  required
                  maxLength={140}
                  placeholder="Town or neighborhood"
                />
              </label>
            </div>
            <label>
              What can we help with?
              <select
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.title}>{s.title}</option>
                ))}
                <option>Something else</option>
              </select>
            </label>
            <label>
              A little about the work
              <textarea
                name="details"
                required
                minLength={10}
                maxLength={1500}
                rows={3}
                placeholder="What needs fixing or changing?"
              />
            </label>
            <label>Project photos (optional)<input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple aria-describedby="photo-help" onChange={(e) => { const files = Array.from(e.target.files || []); setDraft(null); if (files.length > 5 || files.some(f => f.size > 10 * 1024 * 1024)) { setPhotoError("Choose up to 5 photos, each under 10 MB."); setPhotos([]); e.target.value = ""; return; } setPhotoError(""); setPhotos(files); }} /></label>
            <p id="photo-help" className="form-note">Optional: select up to 5 photos to reference in your request. Files stay on your device; attach them yourself when sending the email.</p>
            {photoError && <p role="alert">{photoError}</p>}
            {photos.length > 0 && <ul className="selected-photos">{photos.map((p, i) => <li key={i}>{p.name}</li>)}</ul>}
            <button className="button button-ink" type="submit">
              Prepare my project request <ArrowUpRight size={21} />
            </button>
            <p className="form-note">
              This prepares an email draft. You’ll review and send it from your
              email app, where you can add photos.
            </p>
          </form>
          {draft && (
            <div
              ref={result}
              tabIndex={-1}
              className="draft-ready"
              role="status"
            >
              <Check size={23} />
              <div>
                <h4>Your request is ready.</h4>
                <p>
                  Open the draft, add photos if you like, and send it to us.
                  Nothing has been sent yet.
                </p>
                <a className="button button-ink" href={draft.url}>
                  Open email draft <Mail size={16} />
                </a>
                <details>
                  <summary>Review your request</summary>
                  <pre>{draft.text}</pre>
                </details>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
function Footer({ reduced, systemReduced, toggleMotion }) {
  return (
    <footer className="footer">
      <div className="page-width">
        <div className="footer-top">
          <div className="footer-logo">
            <img
              src="/assets/arctic-wordmark.svg"
              alt="Arctic Handyman Services LLC"
              width="170"
              height="170"
              loading="lazy"
            />
          </div>
          <p>
            A stronger home.
            <br />A better everyday.
          </p>
          <a className="back-top" href="#home">
            Back to top <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Arctic Handyman Services LLC</span>
          <nav aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#our-work">Our work</a>
            <a href="#contact">Contact</a>
          </nav>
          <button
            className="motion-toggle"
            aria-label="Reduce motion"
            aria-pressed={reduced}
            disabled={systemReduced}
            onClick={toggleMotion}
          >
            {reduced ? <Pause size={12} /> : <Play size={12} />}
            {reduced ? "Reduced motion" : "Reduce motion"}
          </button>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  const root = useRef(null),
    systemReduced = useMedia("(prefers-reduced-motion:reduce)"),
    [motionOff, setMotionOff] = useState(false),
    [service, setService] = useState("");
  const reduced = systemReduced || motionOff;
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        anchors: true,
      }),
      tick = (t) => lenis.raf(t * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(
          ".hero-film",
          { scale: 1.12, duration: 1.8, ease: "power2.out" },
          0,
        )
        .from(".hero-location", { autoAlpha: 0, y: 12, duration: 0.7 }, 0.15)
        .from(
          ".hero h1 .mask>span",
          { yPercent: 115, rotate: 2, duration: 1.1, stagger: 0.13 },
          0.3,
        )
        .from(".hero-details", { autoAlpha: 0, y: 18, duration: 0.85 }, 0.85)
        .from(".hero-foot", { autoAlpha: 0, duration: 1 }, 1);
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
      mm.add("(min-width:901px)", () => {
        gsap.from(".steps article", {
          y: 22,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 0.8,
          scrollTrigger: { trigger: ".steps", start: "top 85%", once: true },
        });
        gsap.to(".hero-film", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });
        gsap.to(".hero-content", {
          y: -65,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.from(".intro-cross", {
          rotate: -75,
          scrollTrigger: {
            trigger: ".intro",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
        gsap.utils.toArray(".project").forEach((p) =>
          gsap.from(p.querySelector(".project-story"), {
            y: 45,
            ease: "none",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          }),
        );
      });
      gsap.from(".reading-heading", {
        color: "#b7bdbb",
        duration: 1,
        scrollTrigger: {
          trigger: ".intro",
          start: "top 80%",
          end: "center 55%",
          scrub: 0.7,
        },
      });
      gsap.utils.toArray(".reveal-title").forEach((t) =>
        gsap.from(t, {
          clipPath: "inset(0 0 100% 0)",
          y: 22,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: t, start: "top 92%", once: true },
        }),
      );
      gsap.utils.toArray(".work-section .project-comparison").forEach((f) =>
        gsap.from(f, {
          clipPath: "inset(0 8% 0 8%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: f, start: "top 90%", once: true },
        }),
      );
    }, root);
    const stopMobile = setupMobileMotion(root.current);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(root.current.querySelector("main"));
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
      ro.disconnect();
      stopMobile();
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);
  return (
    <div id="home" ref={root} data-reduced-motion={reduced}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero reduceMotion={reduced} />
        <HomeWorld reduceMotion={reduced} chooseService={setService} />
        <Introduction />
        <Services chooseService={setService} reduceMotion={reduced} />
        <Work reduceMotion={reduced} />
        <Approach reduceMotion={reduced} />
        <FAQ />
        <Contact service={service} setService={setService} />
      </main>
      <Footer
        reduced={reduced}
        systemReduced={systemReduced}
        toggleMotion={() => setMotionOff(!motionOff)}
      />
      <a className="whatsapp-float" href="https://wa.me/19078915505" target="_blank" rel="noopener noreferrer" aria-label="Chat with Arctic Handyman Services LLC on WhatsApp"><svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 3 3 8 6 8l2-2-3-1-1 1-2-2 1-1-1-3Z"/></svg><span>WhatsApp</span></a>
      <div className="mobile-contact">
        <a href={PHONE}>
          <Phone size={16} />
          Call us
        </a>
        <a href="#contact">
          Start your project <ArrowUpRight size={17} />
        </a>
      </div>
    </div>
  );
}
