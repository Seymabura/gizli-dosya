"use client";

import { useCallback, useEffect, useState } from "react";
import { vakaBul } from "@/game/cases";
import { puanla, useOyun } from "@/game/state";
import type { Vaka } from "@/game/types";
import { SahneArka } from "./Art";
import Baslik from "./Baslik";
import Diyalog from "./Diyalog";
import Hud from "./Hud";
import Kesif from "./Kesif";
import Pano from "./Pano";
import Rain from "./Rain";
import Sonuc from "./Sonuc";
import Sorgu from "./Sorgu";
import Suclama from "./Suclama";

/** Uygulamanın kökü: açılış ekranı ↔ vaka */
export default function Oyun() {
  const [vakaId, setVakaId] = useState<string | null>(null);
  const vaka = vakaId ? vakaBul(vakaId) : null;
  if (!vaka) return <Baslik basla={setVakaId} />;
  return <VakaEkrani key={vaka.id} vaka={vaka} cikis={() => setVakaId(null)} />;
}

function VakaEkrani({ vaka, cikis }: { vaka: Vaka; cikis: () => void }) {
  const { d, guncelle, sifirla, hazir } = useOyun(vaka);
  const [mesaj, setMesaj] = useState<string | null>(null);
  const [kart, setKart] = useState<string | null>(null);

  const bildir = useCallback((m: string) => {
    setMesaj(m);
    window.setTimeout(() => setMesaj((x) => (x === m ? null : x)), 2600);
  }, []);

  // İlk açılışta saati başlat
  useEffect(() => {
    if (hazir && !d.basladi) guncelle((o) => ({ ...o, basladi: Date.now() }));
  }, [hazir, d.basladi, guncelle]);

  // Her yeni bölümde sinematik başlık kartı
  const bolum = vaka.bolumler[Math.min(d.bolum, vaka.bolumler.length - 1)];
  useEffect(() => {
    if (!hazir || d.final || d.sonuc) return;
    setKart(bolum.baslik);
    const t = window.setTimeout(() => setKart(null), 1700);
    return () => window.clearTimeout(t);
  }, [hazir, d.bolum, bolum.baslik, d.final, d.sonuc]);

  const ilerle = useCallback(() => {
    guncelle((o) => ({ ...o, bolum: Math.min(o.bolum + 1, vaka.bolumler.length - 1), sahneSatir: 0 }));
    window.scrollTo(0, 0);
  }, [guncelle, vaka.bolumler.length]);

  if (!hazir) return <div className="yukleniyor">Dosya açılıyor…</div>;

  if (d.sonuc) {
    return <Sonuc vaka={vaka} d={d} anaMenu={cikis} bastan={sifirla} />;
  }

  // Final sahnesi
  if (d.final) {
    const sahne = d.final === "dogru" ? vaka.finalDogru : vaka.finalYanlis;
    return (
      <section className="hikaye tam">
        <SahneArka tur={sahne.arkaPlan} />
        <div className="sinema-serit ust" /><div className="sinema-serit alt" />
        <Diyalog
          satirlar={sahne.satirlar}
          karakterler={vaka.karakterler}
          index={d.sahneSatir}
          onIndex={(i) => guncelle((o) => ({ ...o, sahneSatir: i }))}
          onBitti={() => guncelle((o) => {
            const sure = ((o.bitis ?? Date.now()) - (o.basladi ?? Date.now())) / 1000;
            return { ...o, sonuc: puanla(o, vaka, o.final === "dogru", sure) };
          })}
          bitisMetni="Dosyayı kapat"
        />
      </section>
    );
  }

  let icerik: React.ReactNode = null;
  if (bolum.tur === "hikaye") {
    const sahne = vaka.sahneler.find((s) => s.id === bolum.sahne)!;
    icerik = (
      <section className="hikaye">
        <SahneArka tur={sahne.arkaPlan} />
        {(sahne.arkaPlan === "sokak" || sahne.arkaPlan === "dukkan") && <Rain yogunluk={sahne.arkaPlan === "sokak" ? 160 : 60} opaklik={0.3} />}
        <div className="sinema-serit ust" /><div className="sinema-serit alt" />
        <Diyalog
          satirlar={sahne.satirlar}
          karakterler={vaka.karakterler}
          index={d.sahneSatir}
          onIndex={(i) => guncelle((o) => ({ ...o, sahneSatir: i }))}
          onBitti={() => {
            const yeni = (sahne.verir ?? []).filter((k) => !d.kanitlar.includes(k));
            if (yeni.length) {
              guncelle((o) => ({ ...o, kanitlar: [...o.kanitlar, ...yeni] }));
              bildir(`Dosyana ${yeni.length} yeni kanıt eklendi`);
            }
            ilerle();
          }}
        />
      </section>
    );
  } else if (bolum.tur === "kesif") {
    icerik = <Kesif vaka={vaka} d={d} guncelle={guncelle} ilerle={ilerle} bildir={bildir} />;
  } else if (bolum.tur === "sorgu") {
    icerik = <Sorgu vaka={vaka} d={d} guncelle={guncelle} ilerle={ilerle} bildir={bildir} />;
  } else if (bolum.tur === "pano") {
    icerik = <Pano vaka={vaka} d={d} guncelle={guncelle} ilerle={ilerle} />;
  } else if (bolum.tur === "suclama") {
    icerik = <Suclama vaka={vaka} d={d} guncelle={guncelle} geriPano={() => guncelle((o) => ({ ...o, bolum: o.bolum - 1 }))} />;
  }

  return (
    <div className="oyun">
      <Hud vaka={vaka} d={d} guncelle={guncelle} bolumAdi={bolum.baslik} onCikis={cikis} />
      <main className="oyun-icerik">{icerik}</main>
      {kart && (
        <div className="bolum-karti" onClick={() => setKart(null)}>
          <span>{kart.split(" · ")[0]}</span>
          <h2>{kart.split(" · ")[1] ?? kart}</h2>
        </div>
      )}
      {mesaj && <div className="bildirim">{mesaj}</div>}
    </div>
  );
}
