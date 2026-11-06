"use client";

import { useEffect, type ReactNode } from "react";

/** Alttan açılan panel (mobilde tam ekran, masaüstünde ortada) */
export function Tabaka({ baslik, ust, kapat, children, genis }: {
  baslik: string;
  ust?: string;
  kapat: () => void;
  children: ReactNode;
  genis?: boolean;
}) {
  useEffect(() => {
    const f = (e: KeyboardEvent) => { if (e.key === "Escape") kapat(); };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [kapat]);
  return (
    <div className="tabaka-arka" onClick={kapat}>
      <div className={`tabaka ${genis ? "genis" : ""}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-label={baslik}>
        <div className="tabaka-bas">
          <div>
            {ust && <div className="ust-baslik">{ust}</div>}
            <h3>{baslik}</h3>
          </div>
          <button className="kapat" onClick={kapat} aria-label="Kapat">✕</button>
        </div>
        <div className="tabaka-icerik">{children}</div>
      </div>
    </div>
  );
}

export function Kalpler({ sayi, maks }: { sayi: number; maks: number }) {
  return (
    <span className="kalpler" aria-label={`Sabır: ${sayi}/${maks}`}>
      {Array.from({ length: maks }).map((_, i) => (
        <span key={i} className={i < sayi ? "dolu" : "bos"}>◆</span>
      ))}
    </span>
  );
}
