"use client";

import { useState } from "react";
import type { Ifade, Satir, Vaka } from "@/game/types";
import { MAKS_SABIR, type OyunDurumu } from "@/game/state";
import { Portre, SahneArka } from "./Art";
import Diyalog from "./Diyalog";
import { Kalpler, Tabaka } from "./Ui";

/** Bölüm: Şüphelileri sorgula, doğru kanıtı göstererek yalanı yakala */
export default function Sorgu({ vaka, d, guncelle, ilerle, bildir }: {
  vaka: Vaka;
  d: OyunDurumu;
  guncelle: (f: (o: OyunDurumu) => OyunDurumu) => void;
  ilerle: () => void;
  bildir: (m: string) => void;
}) {
  const [secili, setSecili] = useState<string | null>(null);
  const [cevaplar, setCevaplar] = useState<Record<string, string>>({});
  const [gosterilen, setGosterilen] = useState<Ifade | null>(null);
  const [celiski, setCeliski] = useState<{ satirlar: Satir[]; i: number } | null>(null);
  const [damga, setDamga] = useState(false);
  const [sarsil, setSarsil] = useState<string | null>(null);

  const kisi = vaka.supheliler.find((s) => s.id === secili);
  const karakter = vaka.karakterler.find((k) => k.id === secili);
  const herkesGoruldu = vaka.supheliler.every((s) => d.gorusulen.includes(s.id));

  const sec = (id: string) => {
    setSecili(id);
    if (!d.gorusulen.includes(id)) guncelle((o) => ({ ...o, gorusulen: [...o.gorusulen, id] }));
  };

  const kanitGoster = (ifade: Ifade, kanitId: string) => {
    setGosterilen(null);
    if (ifade.yalan && ifade.yalan.kanitlar.includes(kanitId)) {
      guncelle((o) => ({ ...o, yakalanan: o.yakalanan.includes(ifade.id) ? o.yakalanan : [...o.yakalanan, ifade.id] }));
      setDamga(true);
      setTimeout(() => { setDamga(false); setCeliski({ satirlar: ifade.yalan!.tepki, i: 0 }); }, 1300);
    } else {
      guncelle((o) => ({ ...o, sabir: Math.max(0, o.sabir - 1), yanlisKanit: o.yanlisKanit + 1 }));
      setSarsil(ifade.id);
      setTimeout(() => setSarsil(null), 600);
      bildir("Halit: “Bu kanıtın bu ifadeyle ne ilgisi var?”");
    }
  };

  // Şüpheli seçme ekranı
  if (!kisi) {
    return (
      <section className="sorgu">
        <SahneArka tur="sorgu" />
        <div className="sorgu-ust">
          <div>
            <h2>Sorgu Odası</h2>
            <p>Bir şüpheli seç. İfadesinde yalan bulursan doğru kanıtı göster.</p>
          </div>
          <div className="sabir"><small>Başkomiserin sabrı</small><Kalpler sayi={d.sabir} maks={MAKS_SABIR} /></div>
        </div>
        <div className="supheli-izgara">
          {vaka.supheliler.map((s) => {
            const k = vaka.karakterler.find((x) => x.id === s.id);
            const yakalandi = s.ifadeler.some((f) => f.yalan && d.yakalanan.includes(f.id));
            return (
              <button key={s.id} className="supheli-kart" onClick={() => sec(s.id)}>
                {k?.portre && <Portre g={k.portre} boyut={110} />}
                <b>{s.ad}</b>
                <small>{s.meslek}</small>
                <span className={`durum ${yakalandi ? "yakalandi" : d.gorusulen.includes(s.id) ? "goruldu" : ""}`}>
                  {yakalandi ? "Çelişki yakalandı" : d.gorusulen.includes(s.id) ? "Sorgulandı" : "Bekliyor"}
                </span>
              </button>
            );
          })}
        </div>
        <div className="sorgu-alt">
          <button className="btn altin" disabled={!herkesGoruldu} onClick={ilerle}>
            {herkesGoruldu ? "Panoya geç →" : "Dört şüpheliyi de sorgula"}
          </button>
        </div>
      </section>
    );
  }

  // Seçili şüphelinin sorgusu
  return (
    <section className="sorgu">
      <SahneArka tur="sorgu" />
      <div className="sorgu-kisi">
        <button className="geri" onClick={() => setSecili(null)}>← Şüpheliler</button>
        <div className="sabir"><Kalpler sayi={d.sabir} maks={MAKS_SABIR} /></div>
      </div>
      <div className="sorgu-profil">
        {karakter?.portre && <Portre g={karakter.portre} boyut={130} />}
        <div>
          <h2>{kisi.ad}, {kisi.yas}</h2>
          <p className="soluk">{kisi.meslek}</p>
          <p className="iliski">{kisi.iliski}</p>
          <p className="giris-soz">“{kisi.giris[0]?.text}”</p>
        </div>
      </div>

      <div className="ifadeler">
        {kisi.ifadeler.map((f) => {
          const yakalandi = d.yakalanan.includes(f.id);
          return (
            <div key={f.id} className={`ifade ${yakalandi ? "yakalandi" : ""} ${sarsil === f.id ? "sarsil" : ""}`}>
              <p className="ifade-metin">“{f.metin}”</p>
              {cevaplar[f.id] && !yakalandi && <p className="ifade-cevap">↳ “{cevaplar[f.id]}”</p>}
              {yakalandi ? (
                <p className="ifade-sir">◆ {f.yalan!.sir}</p>
              ) : (
                <div className="ifade-btn">
                  <button className="btn hayalet kucuk" onClick={() => setCevaplar((c) => ({ ...c, [f.id]: f.bastir }))}>Üstüne git</button>
                  <button className="btn kirmizi kucuk" disabled={d.sabir <= 0} onClick={() => setGosterilen(f)}>Kanıt göster</button>
                </div>
              )}
            </div>
          );
        })}
        {d.sabir <= 0 && <p className="uyari">Başkomiser sabrını kaybetti. Artık kanıt gösteremezsin; elindekilerle devam et.</p>}
      </div>

      {gosterilen && (
        <Tabaka baslik="Hangi kanıtı gösteriyorsun?" ust={`“${gosterilen.metin}”`} kapat={() => setGosterilen(null)}>
          <div className="kanit-liste">
            {d.kanitlar.map((id) => vaka.kanitlar.find((k) => k.id === id)).map((k) => k && (
              <button key={k.id} className="kanit-satir" onClick={() => kanitGoster(gosterilen, k.id)}>
                <span className="kanit-kod">{k.kod}</span>
                <span><b>{k.baslik}</b><small>{k.kisa}</small></span>
                <span className="ok">›</span>
              </button>
            ))}
          </div>
        </Tabaka>
      )}

      {damga && <div className="celiski-damga"><span>ÇELİŞKİ!</span></div>}

      {celiski && (
        <div className="celiski-diyalog">
          <Diyalog
            satirlar={celiski.satirlar}
            karakterler={vaka.karakterler}
            index={celiski.i}
            onIndex={(i) => setCeliski((c) => (c ? { ...c, i } : c))}
            onBitti={() => setCeliski(null)}
            bitisMetni="Sorguya dön"
          />
        </div>
      )}
    </section>
  );
}
