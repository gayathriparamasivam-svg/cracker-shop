import { useEffect, useRef } from "react";

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
    let particles = [];
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const burst = (x, y) => {
      const hue = Math.random() * 360;
      for (let i = 0; i < 24; i += 1) {
        const angle = (Math.PI * 2 * i) / 24;
        const speed = 0.8 + Math.random() * 2.1;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, hue });
      }
    };
    const frame = (time) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (!reduceMotion && !document.hidden && time - lastLaunch > 1900) {
        burst(Math.random() * window.innerWidth, 70 + Math.random() * Math.min(260, window.innerHeight * 0.35));
        lastLaunch = time;
      }
      particles = particles.filter((p) => p.life > 0.04);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.018; p.life -= 0.014;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 68%, ${p.life * 0.65})`;
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = window.requestAnimationFrame(frame);
    };
    resize();
    window.addEventListener("resize", resize);
    if (!reduceMotion) raf = window.requestAnimationFrame(frame);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}
