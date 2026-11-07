import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "../data/content";
gsap.registerPlugin(ScrollTrigger);

const { path, ext, count, scrollDistance } = content.hero;
const src = (i: number) => `${path}${String(i + 1).padStart(4, "0")}.${ext}`;

export default function Hero360() {
  const wrap = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current!, ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const state = { p: 0 };
    let imgs: HTMLImageElement[] = [], useFrames = false;

    const placeholder = (p: number) => {
      const w = canvas.width, h = canvas.height, a = p * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      const H = h * 0.8, top = h * 0.12, x = w / 2, st = getComputedStyle(document.documentElement);
      ctx.fillStyle = st.getPropertyValue("--fg").trim(); ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.ellipse(x, top + H * 0.98, H * 0.42 * (0.35 + 0.65 * Math.abs(c)), H * 0.45, 0, Math.PI, 0); ctx.fill();
      ctx.fillRect(x - H * 0.04, top + H * 0.5, H * 0.08, H * 0.14);
      ctx.beginPath(); ctx.ellipse(x, top + H * 0.3, H * 0.17 * (0.85 + 0.15 * Math.abs(c)), H * 0.23, 0, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;
      if (c > 0) { ctx.fillStyle = st.getPropertyValue("--acc").trim(); ctx.beginPath(); ctx.ellipse(x + s * H * 0.13, top + H * 0.32, H * 0.015, H * 0.05, 0, 0, 7); ctx.fill(); }
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!useFrames) return placeholder(state.p);
      const im = imgs[Math.round(state.p * (count - 1))];
      if (!im?.complete) return;
      const k = Math.min(canvas.width / im.width, canvas.height / im.height);
      ctx.drawImage(im, (canvas.width - im.width * k) / 2, (canvas.height - im.height * k) / 2, im.width * k, im.height * k);
    };
    const resize = () => { canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr; draw(); };

    const first = new Image();
    first.onload = () => { useFrames = true; imgs = [first]; for (let i = 1; i < count; i++) { const m = new Image(); m.src = src(i); imgs.push(m); } draw(); };
    first.src = src(0);

    window.addEventListener("resize", resize); resize();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gctx = gsap.context(() => {
      if (reduce) return;
      gsap.to(state, { p: 1, ease: "none", onUpdate: draw,
        scrollTrigger: { trigger: wrap.current, start: "top top", end: `+=${scrollDistance}`, pin: true, scrub: true } });
      gsap.to("#cue", { opacity: 0, scrollTrigger: { trigger: wrap.current, start: "top top", end: "+=8%", scrub: true } });
    }, wrap);
    return () => { window.removeEventListener("resize", resize); gctx.revert(); };
  }, []);

  return (
    <header id="hero" ref={wrap} className="hero">
      <canvas ref={cv} role="img" aria-label="Portrait rotating 360 degrees as you scroll" />
      <div className="ht">
        <div className="eyebrow">{content.role}</div>
        <div className="row">
          <h1>{content.headline}</h1>
          <div className="right">
            <p>{content.tagline}</p>
            <a className="btn" href="#work">View My Work</a> <a className="btn" href="#contact">Let’s Work Together</a>
          </div>
        </div>
      </div>
      <div id="cue">SCROLL TO EXPLORE ↓</div>
    </header>
  );
}
