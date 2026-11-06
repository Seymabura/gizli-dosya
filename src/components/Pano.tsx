"use client";

import { useEffect, useRef, useState } from "react";
import type { Vaka } from "@/game/types";
import type { OyunDurumu, PanoKart } from "@/game/state";
import KanitKart from "./KanitKart";
import { Tabaka } from "./Ui";

const KART_G = 118;
const KART_Y = 72;

/** Bölüm: Mantar pano. Kartları taşı, kırmızı iple bağla. */
export default function Pano({ vaka, d, guncelle, ilerle }: {
  vaka: Vaka;
  d: OyunDurumu;
  guncelle: (f: (o: OyunDurumu) => OyunDurumu) => void;
  ilerle: () => void;
}) {
  const alan = useRef<HTMLDivElement>(null);
  const [boyut, setBoyut] = useState({ w: 360, h: 680 });
  const [mod, setMod] = useState<"tasi" | "bagla">("bagla");
  const [ilkSecim, setIlkSecim] = useState<string | null>(null);
  const [detay, setDetay] = useState<string | null>(null);
  const surukle = useRef<{ id: string; dx: number; dy: number; hareket: boolean } | null>(null);

  // Tüm kartlar: şüpheliler + toplanan kanıtlar
  const kartIdleri = [
    ...vaka.supheliler.map((s) => `s:${s.id}`),
    ...d.kanitlar.map((k) => `k:${k}`),
  ];

  // İlk açılışta / yeni kanıt geldiğinde varsayılan yerleşim
  useEffect(() => {
    const eksik = kartIdleri.filter((id) => !d.pano.kartlar.some((k) => k.id === id));
    if (eksik.length === 0) return;
    guncelle((o) => {
      const yeni: PanoKart[] = [...o.pano.kartlar];
      let si = yeni.filter((k) => k.id.startsWith("s:")).length;
      let ki = yeni.filter((k) => k.id.startsWith("k:")).length;
      for (const id of eksik) {
        if (id.startsWith("s:")) {
          yeni.push({ id, x: (si % 2) * 100, y: Math.floor(si / 2) * 13 });
          si++;
        } else {
          yeni.push({ id, x: (ki % 3) * 50, y: 30 + Math.floor(ki / 3) * 13 });
          ki++;
        }
      }
      return { ...o, pano: { ...o.pano, kartlar: yeni } };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kartIdleri.join("|")]);

  useEffect(() => {
    const el = alan.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBoyut({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const px = (k: PanoKart) => ({
    left: (k.x / 100) * (boyut.w - KART_G),
    top: (k.y / 100) * (boyut.h - KART_Y),
  });
  const merkez = (id: string) => {
    const k = d.pano.kartlar.find((x) => x.id === id);
    if (!k) return null;
    const p = px(k);
    return { x: p.left + KART_G / 2, y: p.top + 6 };
  };

  const etiket = (id: string) => {
    if (id.startsWith("s:")) {
      const s = vaka.supheliler.find((x) => x.id === id.slice(2));
      return { kod: "ŞÜPHELİ", ad: s?.ad ?? "", tur: "s" };
    }
    const k = vaka.kanitlar.find((x) => x.id === id.slice(2));
    return { kod: k?.kod ?? "", ad: k?.baslik ?? "", tur: "k" };
  };

  const bagla = (a: string, b: string) => {
    guncelle((o) => {
      const var_ = o.pano.baglar.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
      const baglar: [string, string][] = var_
        ? o.pano.baglar.filter(([x, y]) => !((x === a && y === b) || (x === b && y === a)))
        : [...o.pano.baglar, [a, b]];
      return { ...o, pano: { ...o.pano, baglar } };
    });
  };

  const tikla = (id: string) => {
    if (mod === "tasi") { setDetay(id); return; }
    if (!ilkSecim) { setIlkSecim(id); return; }
    if (ilkSecim === id) { setIlkSecim(null); return; }
    bagla(ilkSecim, id);
    setIlkSecim(null);
  };

  const basla = (e: React.PointerEvent, k: PanoKart) => {
    if (mod !== "tasi") return;
    const p = px(k);
    const r = alan.current!.getBoundingClientRect();
    surukle.current = { id: k.id, dx: e.clientX - r.left - p.left, dy: e.clientY - r.top - p.top, hareket: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const tasi = (e: React.PointerEvent) => {
    const s = surukle.current;
    if (!s || !alan.current) return;
    s.hareket = true;
    const r = alan.current.getBoundingClientRect();
    const left = Math.max(0, Math.min(boyut.w - KART_G, e.clientX - r.left - s.dx));
    const top = Math.max(0, Math.min(boyut.h - KART_Y, e.clientY - r.top - s.dy));
    const x = (left / (boyut.w - KART_G)) * 100;
    const y = (top / (boyut.h - KART_Y)) * 100;
    guncelle((o) => ({ ...o, pano: { ...o.pano, kartlar: o.pano.kartlar.map((k) => (k.id === s.id ? { ...k, x, y } : k)) } }));
  };
  const birak = (id: string) => {
    const s = surukle.current;
    surukle.current = null;
    if (s && !s.hareket) tikla(id);
  };

  const detayKanit = detay?.startsWith("k:") ? vaka.kanitlar.find((k) => k.id === detay.slice(2)) : null;
  const detaySupheli = detay?.startsWith("s:") ? vaka.supheliler.find((s) => s.id === detay.slice(2)) : null;

  return (
    <section className="pano-bolum">
      <div className="pano-ust">
        <div>
          <h2>Dedektif Panosu</h2>
          <p>{mod === "bagla" ? (ilkSecim ? "Şimdi bağlanacak ikinci kartı seç." : "İki karta sırayla dokun, kırmızı iple bağla. İpe tekrar bağlarsan kopar.") : "Kartları sürükle. Dokununca ayrıntısı açılır."}</p>
        </div>
        <div className="mod-sec">
          <button className={mod === "bagla" ? "acik" : ""} onClick={() => { setMod("bagla"); setIlkSecim(null); }}>🧵 Bağla</button>
          <button className={mod === "tasi" ? "acik" : ""} onClick={() => { setMod("tasi"); setIlkSecim(null); }}>✋ Taşı / İncele</button>
        </div>
      </div>

      <div className="pano" ref={alan} onPointerMove={tasi}>
        <svg className="ipler" width={boyut.w} height={boyut.h}>
          {d.pano.baglar.map(([a, b]) => {
            const p = merkez(a), q = merkez(b);
            if (!p || !q) return null;
            const ortaY = Math.max(p.y, q.y) + 40;
            return (
              <path key={a + b} d={`M${p.x} ${p.y} Q${(p.x + q.x) / 2} ${ortaY} ${q.x} ${q.y}`}
                stroke="#b3121a" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9" />
            );
          })}
        </svg>
        {d.pano.kartlar.filter((k) => kartIdleri.includes(k.id)).map((k) => {
          const e = etiket(k.id);
          const p = px(k);
          return (
            <div key={k.id}
              className={`pano-kart ${e.tur === "s" ? "supheli" : ""} ${ilkSecim === k.id ? "secili" : ""} ${mod === "tasi" ? "tasinir" : ""}`}
              style={{ left: p.left, top: p.top, width: KART_G, height: KART_Y }}
              onPointerDown={(ev) => basla(ev, k)}
              onPointerUp={() => birak(k.id)}
              onClick={() => { if (mod === "bagla") tikla(k.id); }}
              role="button" tabIndex={0}>
              <span className="raptiye" />
              <small>{e.kod}</small>
              <b>{e.ad}</b>
            </div>
          );
        })}
      </div>

      <div className="pano-alt">
        <p className="soluk">Pano senin düşünme alanın; bağlantılar puanı etkilemez.</p>
        <button className="btn kirmizi" onClick={ilerle}>⚖ Suçlamaya hazırım</button>
      </div>

      {detayKanit && (
        <Tabaka baslik={detayKanit.baslik} ust={detayKanit.kod} kapat={() => setDetay(null)} genis>
          <KanitKart k={detayKanit} />
        </Tabaka>
      )}
      {detaySupheli && (
        <Tabaka baslik={detaySupheli.ad} ust={detaySupheli.meslek} kapat={() => setDetay(null)}>
          <p className="iliski">{detaySupheli.iliski}</p>
          <h4 className="ara-baslik">İfadeleri</h4>
          {detaySupheli.ifadeler.map((f) => (
            <p key={f.id} className={d.yakalanan.includes(f.id) ? "ifade-cizik" : ""}>“{f.metin}”</p>
          ))}
        </Tabaka>
      )}
    </section>
  );
}
