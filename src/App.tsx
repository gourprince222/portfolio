import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero360 from "./components/Hero360";
import { content as c } from "./data/content";
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => setScrolled(scrollY > 40);
    const onMove = (e: MouseEvent) => { if (cur.current) { cur.current.style.left = e.clientX + "px"; cur.current.style.top = e.clientY + "px"; } };
    addEventListener("scroll", onScroll, { passive: true }); addEventListener("mousemove", onMove);
    let lenis: Lenis | undefined; let tick: ((t: number) => void) | undefined;
    const g = gsap.context(() => {
      if (reduce) return;
      lenis = new Lenis(); lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis!.raf(t * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) =>
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
    }, root);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("mousemove", onMove); if (tick) gsap.ticker.remove(tick); lenis?.destroy(); g.revert(); };
  }, []);

  const grow = (on: boolean) => { if (cur.current) cur.current.style.width = cur.current.style.height = on ? "46px" : "10px"; };
  const marquee = (c.marquee.join("  /  ") + "  /  ").repeat(6);
  const links = ["About", "Work", "Skills", "Services", "Contact"];

  return (
    <div ref={root}>
      <div id="cur" ref={cur} aria-hidden />
      <nav className={scrolled || menu ? "s" : ""}>
        <a className="logo" href="#hero">{c.name}</a>
        <div className="l">
          {links.map((l) => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
          <a className="btn" href="#contact" onMouseEnter={() => grow(true)} onMouseLeave={() => grow(false)}>Let’s Work Together</a>
        </div>
        <button className="burger" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? "Close" : "Menu"}</button>
      </nav>
      {menu && <div className="mob">{links.map((l) => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenu(false)}>{l}</a>)}</div>}

      <Hero360 />
      <main>
        <section id="about"><div className="g"><h2 className="rv">More than a developer.</h2>
          <div><p>{c.about}</p>
            <div className="stats">{c.stats.map((s) => <div key={s.label} className="rv"><b>{s.value}</b><span>{s.label}</span></div>)}</div></div></div></section>

        <div className="mq" aria-hidden><div>{marquee}</div></div>

        <section id="work"><h2 className="rv">Selected work.</h2>
          {c.projects.map((p) => (
            <a key={p.title} className="p rv" href={p.href} onMouseEnter={() => grow(true)} onMouseLeave={() => grow(false)}>
              <div className="v">{p.image ? <img src={p.image} alt={p.title} loading="lazy" /> : "PROJECT VISUAL"}</div>
              <div><small>{p.category}</small><h3>{p.title}</h3><p>{p.description}</p><p>{p.tech} <span className="ar">→</span> View Project</p></div>
            </a>))}</section>

        <section id="skills"><h2 className="rv">Skills.</h2>
          {c.skills.map((s) => <div key={s.group}><div className="lab">{s.group}</div><div className="sk">{s.items.map((i) => <span key={i}>{i}</span>)}</div></div>)}</section>

        <section id="services"><h2 className="rv">Let’s build something worth remembering.</h2>
          <div className="sv">{c.services.map((s) => <div key={s.title} className="rv"><h3>{s.title}</h3><p>{s.text}</p></div>)}</div>
          <div className="lab">WHY WORK WITH ME</div><div className="sk">{c.why.map((w) => <span key={w}>{w}</span>)}</div></section>

        {c.testimonials.length > 0 && <section id="testimonials"><h2 className="rv">Kind words.</h2>
          {c.testimonials.map((t) => <blockquote key={t.author} className="serif rv" style={{ fontSize: "1.8rem", margin: "2rem 0" }}>“{t.quote}” <footer style={{ border: 0, padding: 0 }}>— {t.author}</footer></blockquote>)}</section>}

        <section id="contact"><div className="g"><div><h2 className="rv">Have an idea? Let’s build it.</h2>
          <p className="mut">Whether you need a premium portfolio, a business website or a custom digital product, let’s create something people remember.</p>
          <p style={{ marginTop: "1.5rem" }}><a href={`mailto:${c.email}`}>{c.email}</a>{c.socials.map((s) => <span key={s.label}> · <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></span>)}</p></div>
          {/* Wire to Formspree/EmailJS later: replace onSubmit with a real POST */}
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input placeholder="Name" required aria-label="Name" /><input type="email" placeholder="Email" required aria-label="Email" />
            <select aria-label="Project type"><option>Portfolio</option><option>Business website</option><option>Web application</option></select>
            <textarea rows={4} placeholder="Message" aria-label="Message" /><button className="btn ghost">{sent ? "Thank you ✓" : "Let’s Build"}</button></form></div></section>

        <section className="center"><h2 className="rv">Your next website could look like this.</h2><a className="btn" href="#contact">Start a Project →</a></section>
      </main>
      <footer><span>{c.name}</span><span>Built with curiosity + code</span><span>© {new Date().getFullYear()}</span></footer>
    </div>
  );
}
