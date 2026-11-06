"use client";

import { useEffect, useRef, useState } from "react";
import type { Karakter, Satir } from "@/game/types";
import { Portre } from "./Art";

/**
 * Görsel roman tarzı diyalog kutusu.
 * Dokununca: yazı akıyorsa tamamlanır, bittiyse sonraki satıra geçilir.
 */
export default function Diyalog({
  satirlar,
  karakterler,
  index,
  onIndex,
  onBitti,
  bitisMetni = "Devam et",
}: {
  satirlar: Satir[];
  karakterler: Karakter[];
  index: number;
  onIndex: (i: number) => void;
  onBitti: () => void;
  bitisMetni?: string;
}) {
  const i = Math.min(index, satirlar.length - 1);
  const satir = satirlar[i];
  const kisi = karakterler.find((k) => k.id === satir.who);
  const [goster, setGoster] = useState(0);
  const zaman = useRef<ReturnType<typeof setInterval> | null>(null);
  const sonSatir = i >= satirlar.length - 1;
  const bitti = goster >= satir.text.length;

  useEffect(() => {
    setGoster(0);
    if (zaman.current) clearInterval(zaman.current);
    zaman.current = setInterval(() => {
      setGoster((g) => {
        if (g >= satir.text.length) {
          if (zaman.current) clearInterval(zaman.current);
          return g;
        }
        return g + 2;
      });
    }, 28);
    return () => { if (zaman.current) clearInterval(zaman.current); };
  }, [i, satir.text]);

  const ilerle = () => {
    if (!bitti) { setGoster(satir.text.length); return; }
    if (sonSatir) onBitti();
    else onIndex(i + 1);
  };

  const anlatici = satir.who === "anlatici";
  const sen = satir.who === "sen";

  return (
    <div className="diyalog-alan" onClick={ilerle} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ilerle(); } }}>
      {kisi?.portre && (
        <div className="diyalog-portre" key={kisi.id}>
          <Portre g={kisi.portre} boyut={220} />
        </div>
      )}
      <div className={`diyalog-kutu ${anlatici ? "anlatici" : ""} ${sen ? "sen" : ""}`}>
        {!anlatici && (
          <div className="diyalog-isim" style={kisi?.portre ? { color: kisi.portre.renk } : undefined}>
            {kisi?.ad ?? "?"} {kisi?.rol && <span>· {kisi.rol}</span>}
          </div>
        )}
        <p className="diyalog-metin">
          {satir.text.slice(0, goster)}
          {!bitti && <span className="imlec">▌</span>}
        </p>
        <div className="diyalog-alt">
          <span className="sayac">{i + 1}/{satirlar.length}</span>
          {bitti && <span className="devam">{sonSatir ? bitisMetni + " ▸" : "Dokun ▸"}</span>}
        </div>
      </div>
    </div>
  );
}
