import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
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
const PHONE = "tel:+19077448725",
  EMAIL = "alaskahandymanservices907@gmail.com";
const services = [
  {
    title: "Repairs & maintenance",
    icon: Wrench,
    lead: "Doors that stick. Trim that’s tired. The list that keeps growing.",
    text: "Bring us your repair list. We’ll talk through the work, the materials and what makes sense to tackle together.",
    tasks: ["Doors & hardware", "General home repairs", "Home punch lists"],
    photo: "workshop",
  },
  {
    title: "Painting & drywall",
    icon: PaintRoller,
    lead: "Fresh walls. Clean edges. A room that feels new again.",
    text: "From patching damaged walls to refreshing the finish, share your space and the look you have in mind.",
    tasks: ["Drywall patching", "Interior painting", "Surface preparation"],
    photo: "after1",
  },
  {
    title: "Carpentry & trim",
    icon: Hammer,
    lead: "The details you notice. The difference you feel.",
    text: "Explore trim, shelving and custom details that make the most of your space. Turn the idea into a practical plan.",
    tasks: ["Trim & molding", "Shelving", "Feature walls"],
    photo: "craft-detail",
  },
  {
    title: "Room improvements",
    icon: House,
    lead: "Rework the room. Keep the place you call home.",
    text: "A bathroom refresh or a living room update starts with a clear scope. Tell us what you want to change.",
    tasks: ["Bathroom refreshes", "Living room updates", "Finish upgrades"],
    photo: "after",
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
      aria-label="Alaska Handyman Services home"
    >
      <span className="brand-symbol">
        <img src="/assets/favicon.png" width="90" height="90" alt="" />
      </span>
      <span className="brand-name">
        ALASKA<span>Handyman Services</span>
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
            (907) 744-8725
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
          <span>✳</span> Home repairs & improvements in Alaska
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
        <a className="explore-link" href="#our-work">
          <span className="circle-arrow">
            <ArrowDown size={20} />
          </span>
          See what’s possible
        </a>
        <span className="hero-foot-note">
          Practical skills. A personal touch.
        </span>
        <span className="hero-place">
          Alaska Handyman Services <span>907</span>
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
            Paint, drywall, carpentry and the repairs that never quite leave
            your list. Alaska Handyman Services helps you take the next step
            with a clear plan for your space.
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
  const [active, setActive] = useState(0),
    image = useRef(null),
    reduced = reduceMotion;
  useEffect(() => {
    if (!reduced) {
      const t = gsap.fromTo(
        image.current,
        { opacity: 0.25, scale: 1.035 },
        { opacity: 1, scale: 1, duration: 0.65, ease: "power2.out" },
      );
      return () => t.kill();
    }
  }, [active, reduced]);
  const s = services[active];
  return (
    <section className="services-section" id="services">
      <div className="page-width">
        <div className="section-top">
          <span className="small-label">What needs doing?</span>
          <p>Small repairs to room transformations.</p>
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
                    onClick={() => setActive(i)}
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
          <div className="service-photo">
            <img
              ref={image}
              src={`/assets/${s.photo}.webp`}
              alt={
                active === 0 || active === 2
                  ? "Careful woodworking at a workshop bench"
                  : active === 1
                    ? "Refreshed fireplace and living room"
                    : "Bathroom with updated cabinetry"
              }
              width="900"
              height="1000"
              loading="lazy"
            />
            <span className="photo-note">
              <s.icon size={20} strokeWidth={1.4} />
              From the first detail to the final finish.
            </span>
          </div>
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
    text: "A dated vanity becomes a cleaner, brighter space with dark cabinetry, new fixtures and updated finishes.",
    tags: ["Cabinet finishes", "Fixtures", "Room refresh"],
  },
  {
    id: "living",
    title: ["A wall becomes", "the whole room."],
    room: "The living room transformation",
    before: "before1",
    after: "after1",
    text: "A detailed fireplace surround and geometric accent walls give this living room a completely different presence.",
    tags: ["Finish carpentry", "Accent walls", "Fireplace surround"],
  },
];
function Comparison({ project: p }) {
  const [v, set] = useState(48);
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
          onChange={(e) => set(Number(e.target.value))}
          aria-label={`Compare ${p.room}`}
          aria-valuetext={`${v}% before and ${100 - v}% after`}
        />
        <span className="drag-note">
          <MoveHorizontal size={13} />
          Move the slider. See the difference.
        </span>
      </div>
      <div className="comparison-tools">
        <span>Original space → Finished space</span>
        <div>
          <button
            onClick={() => set(100)}
            aria-label={`Show before: ${p.room}`}
          >
            Before
          </button>
          <span>/</span>
          <button onClick={() => set(0)} aria-label={`Show after: ${p.room}`}>
            After
          </button>
          <span>/</span>
          <button
            onClick={() => set(50)}
            aria-label={`Compare both: ${p.room}`}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}
function Work() {
  return (
    <section className="work-section" id="our-work">
      <div className="page-width">
        <div className="work-heading">
          <span className="small-label">A closer look</span>
          <h2 className="reveal-title">
            Don’t just imagine it.
            <br />
            See the change.
          </h2>
          <p>
            Two spaces. A fresh start.
            <br />
            Explore the before and after.
          </p>
        </div>
        {projects.map((p, i) => (
          <article className={`project project-${i}`} key={p.id}>
            <div className="project-story">
              <span className="project-category">{p.room}</span>
              <h3>
                {p.title.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </h3>
              <p>{p.text}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a
                href="#contact"
                className="project-link"
                aria-label={`Discuss a project like ${p.room}`}
              >
                <ArrowUpRight size={26} />
              </a>
            </div>
            <Comparison project={p} />
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
                text: "Send your list, location and a few photos. Tell us what isn’t working — and what you’d love to change.",
              },
              {
                n: "02",
                title: "Let’s work out the details.",
                text: "Talk through the scope, materials, timing and estimate. Start with a plan you understand.",
              },
              {
                n: "03",
                title: "Bring your space together.",
                text: "Move from the plan to the work, then walk through the details together.",
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
            Alaska is home.
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
    "Repairs, painting, drywall, finish carpentry and room updates are a good place to start. Share your project and we’ll confirm the scope, availability and whether specialist trades are needed.",
  ],
  [
    "How do I get an estimate?",
    "Call (907) 744-8725 or prepare an email request below. Include your location, a description of the work and photos if you have them. Some projects need an on-site look first.",
  ],
  [
    "Do you work in my area?",
    "Send your Alaska town or neighborhood. We’ll confirm service availability at your location before scheduling.",
  ],
  [
    "Can I combine several small repairs?",
    "Send the whole list when you get in touch. That makes it easier to discuss the scope and plan the work together.",
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
  const [draft, setDraft] = useState(null),
    result = useRef(null);
  useEffect(() => setDraft(null), [service]);
  const prepare = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      text = `Hello Alaska Handyman Services,\n\nI’d like to discuss a project.\n\nName: ${d.get("name").trim()}\nEmail: ${d.get("email").trim()}\nPhone: ${d.get("phone").trim() || "Not provided"}\nLocation: ${d.get("location").trim()}\nService: ${service || "Let’s discuss"}\n\nProject details:\n${d.get("details").trim()}\n\nThank you!`;
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
            (907) 744-8725 <ArrowUpRight size={24} />
          </a>
          <a href={`mailto:${EMAIL}`} className="contact-email">
            {EMAIL}
          </a>
          <div className="contact-mark">
            <Mountain size={27} strokeWidth={1.2} />
            <span>
              Alaska Handyman Services
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
              src="/assets/logo.webp"
              alt="Alaska Handyman Service — Built for a stronger tomorrow"
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
          <span>© {new Date().getFullYear()} Alaska Handyman Services</span>
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
function App() {
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
        anchors: { offset: -95 },
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
      gsap.utils.toArray(".project-comparison").forEach((f) =>
        gsap.from(f, {
          clipPath: "inset(0 8% 0 8%)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: f, start: "top 90%", once: true },
        }),
      );
      gsap.from(".steps article", {
        y: 22,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: { trigger: ".steps", start: "top 85%", once: true },
      });
    }, root);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(root.current.querySelector("main"));
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
      ro.disconnect();
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);
  return (
    <div id="home" ref={root}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero reduceMotion={reduced} />
        <Introduction />
        <Services chooseService={setService} reduceMotion={reduced} />
        <Work />
        <Approach reduceMotion={reduced} />
        <FAQ />
        <Contact service={service} setService={setService} />
      </main>
      <Footer
        reduced={reduced}
        systemReduced={systemReduced}
        toggleMotion={() => setMotionOff(!motionOff)}
      />
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
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
