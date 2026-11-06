"use client";

import { useState } from "react";
import type { Vaka } from "@/game/types";
import { MAKS_DENEME, type OyunDurumu } from "@/game/state";
import { Portre, SahneArka } from "./Art";

/** Bölüm: Savcılık — üç adımlı suçlama */
export default function Suclama({ vaka, d, guncelle, geriPano }: {
  vaka: Vaka;
  d: OyunDurumu;
  guncelle: (f: (o: OyunDurumu) => OyunDurumu) => void;
  geriPano: () => void;
}) {
  const [adim, setAdim] = useState(0);
  const [secim, setSecim] = useState<{ supheli?: string; kanit?: string; motivasyon?: string }>({});
  const [ret, setRet] = useState<string | null>(null);

  const kalan = MAKS_DENEME - d.deneme;
  const anahtar = (["supheli", "kanit", "motivasyon"] as const)[adim];

  const gonder = () => {
    const parcalar = [
      secim.supheli === vaka.dogru.supheli,
      secim.kanit === vaka.dogru.kanit,
      secim.motivasyon === vaka.dogru.motivasyon,
    ];
    const dogru = parcalar.filter(Boolean).length;
    const deneme = d.deneme + 1;
    const bitti = dogru === 3 || deneme >= MAKS_DENEME;
    guncelle((o) => ({
      ...o,
      deneme,
      dogruParca: o.dogruParca + dogru,
      toplamParca: o.toplamParca + 3,
      final: bitti ? (dogru === 3 ? "dogru" : "yanlis") : null,
      bitis: bitti ? Date.now() : null,
      sahneSatir: 0,
    }));
    if (!bitti) {
      setRet(`Savcı dosyayı geri çevirdi. Suçlamanın 3 noktasından ${dogru} tanesi tutuyor. Hangisinin yanlış olduğunu bulmak sana kalmış. Son bir hakkın var.`);
      setAdim(0);
    }
  };

  return (
    <section className="suclama">
      <SahneArka tur="ofis" />
      <div className="suclama-ic">
        <div className="ust-baslik">Savcılık · Adım {adim + 1}/3 · Kalan hak: {kalan}</div>
        <div className="adimlar">{[0, 1, 2].map((i) => <i key={i} className={i <= adim ? "acik" : ""} />)}</div>

        {ret && <div className="ret">{ret}</div>}

        {adim === 0 && (
          <>
            <h2>Suçlu kim?</h2>
            <div className="secenek-izgara">
              {vaka.supheliler.map((s) => {
                const k = vaka.karakterler.find((x) => x.id === s.id);
                return (
                  <button key={s.id} className={`secenek-kisi ${secim.supheli === s.id ? "acik" : ""}`} onClick={() => setSecim((x) => ({ ...x, supheli: s.id }))}>
                    {k?.portre && <Portre g={k.portre} boyut={84} />}
                    <b>{s.ad}</b>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {adim === 1 && (
          <>
            <h2>Yalanını hangi kanıt çürütüyor?</h2>
            <p className="soluk">Seçtiğin kişinin ifadesindeki çelişkiyi kesin olarak ortaya koyan kanıt.</p>
            <div className="secenekler">
              {d.kanitlar.map((id) => vaka.kanitlar.find((k) => k.id === id)).map((k) => k && (
                <button key={k.id} className={`secenek ${secim.kanit === k.id ? "acik" : ""}`} onClick={() => setSecim((x) => ({ ...x, kanit: k.id }))}>
                  <span className="nokta-sec" /><span><b>{k.kod} · {k.baslik}</b><small>{k.kisa}</small></span>
                </button>
              ))}
            </div>
          </>
        )}

        {adim === 2 && (
          <>
            <h2>Neden yaptı?</h2>
            <div className="secenekler">
              {vaka.motivasyonlar.map((m) => (
                <button key={m.id} className={`secenek ${secim.motivasyon === m.id ? "acik" : ""}`} onClick={() => setSecim((x) => ({ ...x, motivasyon: m.id }))}>
                  <span className="nokta-sec" /><span><b>{m.metin}</b><small>{m.aciklama}</small></span>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="satir-btn">
          <button className="btn hayalet" onClick={() => (adim === 0 ? geriPano() : setAdim(adim - 1))}>
            {adim === 0 ? "← Panoya dön" : "← Geri"}
          </button>
          {adim < 2 ? (
            <button className="btn altin" disabled={!secim[anahtar]} onClick={() => { setRet(null); setAdim(adim + 1); }}>İleri →</button>
          ) : (
            <button className="btn kirmizi" disabled={!secim.motivasyon} onClick={gonder}>⚖ Suçla</button>
          )}
        </div>
      </div>
    </section>
  );
}
