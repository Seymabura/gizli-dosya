"use client";

import { useEffect, useRef } from "react";

/** Ekrana yağmur yağdıran hafif bir canvas katmanı */
export default function Rain({ yogunluk = 140, opaklik = 0.35 }: { yogunluk?: number; opaklik?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const azHareket = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0;
    const damlalar: { x: number; y: number; l: number; v: number }[] = [];
    const boyutla = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    boyutla();
    for (let i = 0; i < yogunluk; i++) {
      damlalar.push({ x: Math.random() * w, y: Math.random() * h, l: 10 + Math.random() * 18, v: 7 + Math.random() * 9 });
    }
    const ciz = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(190,205,225,${opaklik})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const d of damlalar) {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.l * 0.18, d.y + d.l);
        d.y += d.v; d.x -= d.v * 0.18;
        if (d.y > h) { d.y = -20; d.x = Math.random() * (w + 60); }
      }
      ctx.stroke();
      raf = requestAnimationFrame(ciz);
    };
    if (!azHareket) ciz();
    window.addEventListener("resize", boyutla);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", boyutla); };
  }, [yogunluk, opaklik]);

  return <canvas ref={ref} className="rain" aria-hidden="true" />;
}
