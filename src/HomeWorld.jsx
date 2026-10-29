import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, RotateCcw, Layers3, Moon, Sun, MoveHorizontal, Wrench, PaintRoller, Hammer, House } from "lucide-react";
import { gsap } from "gsap";
import "./home-world.css";

const details = [
  { name: "Repair", service: "Repairs & maintenance", icon: Wrench, title: "Make the everyday work better.", text: "The door that catches. The hardware that’s loose. Start with the details you use every day." },
  { name: "Refresh", service: "Painting services", icon: PaintRoller, title: "A fresh finish changes the feeling.", text: "Smooth walls and a considered color can give a familiar space a completely new outlook." },
  { name: "Refine", service: "Carpentry & trim", icon: Hammer, title: "Good details bring it together.", text: "Trim, shelving and thoughtful woodwork add character where you’ll notice it most." },
  { name: "Reimagine", service: "Bathroom remodeling", icon: House, title: "See the possibility in your space.", text: "Bring your ideas for a room refresh. We’ll help you work out the practical next steps." },
];

function HouseIllustration() {
  return <svg className="world-fallback" viewBox="0 0 600 450" role="img" aria-label="Illustrated Alaska home with a cedar facade, green roof and trees">
    <ellipse cx="305" cy="363" rx="210" ry="39" fill="#183e35" opacity=".12" />
    <path d="m85 300 225-87 211 94-226 96Z" fill="#9eafa0" /><path d="m85 300 210 96 226-89v17l-226 95-210-96Z" fill="#45635b" />
    <path d="m177 213 132-61 141 62v107l-132 59-141-64Z" fill="#dfdfc9" />
    <path d="m177 213 141 64v103l-141-64Z" fill="#ba8a58" /><path d="m318 277 132-63v107l-132 59Z" fill="#d7dfd1" />
    <path d="m148 219 98-118 146 65-73 120Z" fill="#28524b" /><path d="m246 101 146 65 83 60-83-19Z" fill="#183d37" />
    <path d="m246 101 72 135 144-22-70-48Z" fill="#3c655b" />
    <path d="m196 236 29 13v46l-29-13Zm82 37 25 11v46l-25-11Z" fill="#72998b" stroke="#efe9d0" strokeWidth="5" />
    <path d="m238 276 23 10v59l-23-10Z" fill="#244b44" /><path d="m344 274 59-26v49l-59 26Z" fill="#5e8c82" stroke="#eee9d6" strokeWidth="5" />
    <path d="m162 321 155 70 137-58-10-16-127 51-140-65Z" fill="#b68a5c" />
    <path d="M112 290v-65m-28 25 28-85 30 85Zm11-38 17-61 21 61Z" fill="#3d6b56" stroke="#3d6b56" strokeWidth="7" />
    <path d="M478 281v-53m-28 16 29-87 28 87Zm12-35 17-62 20 62Z" fill="#577c5e" stroke="#577c5e" strokeWidth="7" />
  </svg>;
}

export default function HomeWorld({ reduceMotion, chooseService }) {
  const host = useRef(null), section = useRef(null), api = useRef(null), detailRef = useRef(null);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0), [layers, setLayers] = useState(false), [night, setNight] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const activeRef = useRef(active); activeRef.current = active;
  const select = (index) => { setActive(index); setLayers(false); api.current?.focus(index); };
  const selectRef = useRef(select); selectRef.current = select;
  useEffect(() => {
    setReady(false); setLayers(false); setNight(false);
    if (reduceMotion || failed) return;
    let cancelled = false, instance;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      import("./world.js").then(({ createHomeWorld }) => {
        if (cancelled) return;
        instance = createHomeWorld(host.current, {
          initialFocus: activeRef.current,
          onFocus: (index) => selectRef.current(index),
          onInteract: () => setInteracted(true),
          onError: () => setFailed(true),
        });
        api.current = instance; setReady(true);
      }).catch(() => { if (!cancelled) setFailed(true); });
    }, { rootMargin: "300px" });
    io.observe(section.current);
    return () => { cancelled = true; io.disconnect(); instance?.dispose(); api.current = null; };
  }, [reduceMotion, failed]);
  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => gsap.fromTo(detailRef.current.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.55, ease: "power3.out" }), detailRef);
    return () => ctx.revert();
  }, [active, reduceMotion]);
  const item = details[active];
  return <section id="home-world" className={`home-world ${night ? "world-evening" : ""}`} ref={section} aria-labelledby="world-title">
    <div className="world-layout page-width">
      <div className="world-heading">
        <span className="small-label world-kicker"><span /> A little care. A world of difference.</span>
        <h2 id="world-title">Your home.<br />Every angle.</h2>
        <p>Explore the details that make a house feel like yours.</p>
      </div>
      <div className={`world-stage ${ready ? "world-ready" : ""}`}>
        <div className="world-orbit" aria-hidden="true" />
        <div className="world-stage-top">
          <span className="world-model-label">The Alaska home <small>Interactive illustration</small></span>
          {ready && <button className="world-light" aria-label={night ? "Switch to daylight" : "Switch to evening light"} aria-pressed={night} onClick={() => { api.current?.night(!night); setNight(!night); }}>{night ? <Sun size={18} /> : <Moon size={18} />}</button>}
        </div>
        <HouseIllustration />
        <div className="world-canvas" ref={host} role="group" tabIndex={ready ? 0 : -1} aria-label="Interactive 3D home. Swipe sideways or use left and right arrow keys to rotate. Home resets the view." onKeyDown={(e) => {
          if (!ready) return;
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); api.current?.rotate(e.key === "ArrowLeft" ? -0.45 : 0.45); }
          if (e.key === "Home") { e.preventDefault(); api.current?.reset(); setLayers(false); }
        }} />
        {ready && <>
          <div className="world-view-tools" aria-label="3D view controls">
            <button aria-label="Rotate home left" onClick={() => api.current?.rotate(-0.6)}><ChevronLeft size={18} /></button>
            <button aria-label="Reset home view" onClick={() => { api.current?.reset(); setLayers(false); }}><RotateCcw size={15} /></button>
            <button aria-label="Rotate home right" onClick={() => api.current?.rotate(0.6)}><ChevronRight size={18} /></button>
          </div>
          <button className="world-layers" aria-pressed={layers} onClick={() => { api.current?.layers(!layers); setLayers(!layers); }}><Layers3 size={16} />{layers ? "Bring it together" : "Explore the layers"}</button>
        </>}
        <div className="world-instruction" aria-live="polite">
          {ready ? <><MoveHorizontal size={16} /><span>{layers ? "Every detail has its place." : interacted ? "Keep exploring. Make it your own." : "Swipe to turn. Tap a detail."}</span></> : <span>{reduceMotion ? "Still view · reduced motion" : failed ? "Illustrated view" : "Preparing your home…"}</span>}
        </div>
      </div>
      <div className="world-story">
        <div className="world-tabs" role="group" aria-label="Explore home improvements">
          {details.map((d, i) => { const Icon = d.icon; return <button key={d.name} aria-pressed={active === i} onClick={() => select(i)}><Icon size={18} /><span>{d.name}</span></button>; })}
        </div>
        <div className="world-detail" ref={detailRef} aria-live="polite" aria-atomic="true">
          <h3>{item.title}</h3><p>{item.text}</p>
          <a href="#contact" className="text-link" onClick={() => chooseService(item.service)}>Let’s talk {item.name.toLowerCase() === "repair" ? "repairs" : "ideas"}<ArrowUpRight size={17} /></a>
        </div>
      </div>
    </div>
  </section>;
}
