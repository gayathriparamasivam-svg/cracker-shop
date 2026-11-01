import { useEffect, useRef } from "react";

// Sky-shot style: a rocket rises from the bottom, then bursts into a big round shell.
const LAUNCH_EVERY_MS = 2200; // time between new shots
const MAX_SHOTS = 3;          // never more than this many shots at once
const SHOT_SIZE = 1;          // 1.3 = bigger bursts, 0.8 = smaller
const BRIGHTNESS = 0.9;       // 0.6 = soft, 1 = full

export default function Fireworks() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let lastLaunch = 0;
    let shotId = 0;
    let rockets = [];
    let sparks = [];
    let flashes = [];

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const explode = (x, y, hue) => {
      shotId += 1;
      const scale = Math.max(0.6, Math.min(1, window.innerWidth / 900)) * SHOT_SIZE;
      // outer shell
      for (let i = 0; i < 64; i += 1) {
        const a = (Math.PI * 2 * i) / 64;
        const s = (3.4 + Math.random() * 3.2) * scale;
        sparks.push({ id: shotId, x, y, px: x, py: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue });
      }
      // inner shell in a second colour
      for (let i = 0; i < 28; i += 1) {
        const a = (Math.PI * 2 * i) / 28 + 0.1;
        const s = (1.5 + Math.random() * 1.8) * scale;
        sparks.push({ id: shotId, x, y, px: x, py: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue: (hue + 50) % 360 });
      }
      flashes.push({ x, y, life: 1 });
    };

    const frame = (time) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      // launch a new rocket
      if (!reduceMotion && !document.hidden && time - lastLaunch > LAUNCH_EVERY_MS) {
        const active = rockets.length + new Set(sparks.map((s) => s.id)).size;
        if (active < MAX_SHOTS) {
          rockets.push({ x: w * (0.15 + Math.random() * 0.7), y: h + 10, py: h + 10, ty: h * (0.15 + Math.random() * 0.3), hue: Math.random() * 360 });
          lastLaunch = time;
        }
      }

      // rockets rising
      rockets = rockets.filter((r) => {
        r.py = r.y;
        r.y -= Math.min(14, Math.max(2.5, (r.y - r.ty) * 0.04));
        if (r.y <= r.ty + 4) { explode(r.x, r.y, r.hue); return false; }
        ctx.strokeStyle = "rgba(255,226,170,.35)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(r.x, r.y + 26); ctx.lineTo(r.x, r.y); ctx.stroke();
        ctx.strokeStyle = "rgba(255,240,205,.9)"; ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.moveTo(r.x, r.py); ctx.lineTo(r.x, r.y); ctx.stroke();
        return true;
      });

      // burst flash
      flashes = flashes.filter((f) => f.life > 0.05);
      flashes.forEach((f) => {
        f.life -= 0.1;
        ctx.fillStyle = `rgba(255,244,220,${Math.max(0, f.life) * 0.3})`;
        ctx.beginPath(); ctx.arc(f.x, f.y, 26 + (1 - f.life) * 50, 0, Math.PI * 2); ctx.fill();
      });

      // sparks
      sparks = sparks.filter((s) => s.life > 0.04);
      sparks.forEach((s) => {
        s.px = s.x; s.py = s.y;
        s.x += s.vx; s.y += s.vy;
        s.vx *= 0.985; s.vy = s.vy * 0.985 + 0.035;
        s.life -= 0.012;
        ctx.strokeStyle = `hsla(${s.hue}, 100%, 66%, ${Math.min(1, s.life * 1.1) * BRIGHTNESS})`;
        ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(s.px, s.py); ctx.lineTo(s.x, s.y); ctx.stroke();
      });

      raf = window.requestAnimationFrame(frame);
    };

    const onVisibility = () => { if (document.hidden) { rockets = []; sparks = []; flashes = []; } };
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) raf = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}
