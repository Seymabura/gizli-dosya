"use client";

import { useState } from "react";
import type { IlgiNoktasi, Vaka } from "@/game/types";
import type { OyunDurumu } from "@/game/state";
import { OdaCizim } from "./Art";
import Rain from "./Rain";

/** Bölüm: Olay yerini gez, noktalara dokun, kanıt topla */
export default function Kesif({ vaka, d, guncelle, ilerle, bildir }: {
  vaka: Vaka;
  d: OyunDurumu;
  guncelle: (f: (o: OyunDurumu) => OyunDurumu) => void;
  ilerle: () => void;
  bildir: (m: string) => void;
}) {
  const [acik, setAcik] = useState<IlgiNoktasi | null>(null);
  const oda = vaka.odalar.find((o) => o.id === d.oda) ?? vaka.odalar[0];
  const noktalar = vaka.noktalar.filter((n) => n.oda === oda.id);
  const zorunlu = vaka.noktalar.filter((n) => n.zorunlu);
  const bulunanZorunlu = zorunlu.filter((n) => d.bulunan.includes(n.id)).length;
  const tamam = bulunanZorunlu === zorunlu.length;

  const incele = (n: IlgiNoktasi) => {
    setAcik(n);
    if (d.bulunan.includes(n.id)) return;
    guncelle((o) => ({
      ...o,
      bulunan: [...o.bulunan, n.id],
      kanitlar: n.verir && !o.kanitlar.includes(n.verir) ? [...o.kanitlar, n.verir] : o.kanitlar,
    }));
    if (n.verir) {
      const k = vaka.kanitlar.find((x) => x.id === n.verir);
      if (k) bildir(`Yeni kanıt: ${k.kod} ${k.baslik}`);
    }
  };

  return (
    <section className="kesif">
      <div className="oda-sekme">
        {vaka.odalar.map((o) => {
          const kalan = vaka.noktalar.filter((n) => n.oda === o.id && n.zorunlu && !d.bulunan.includes(n.id)).length;
          return (
            <button key={o.id} className={o.id === oda.id ? "acik" : ""} onClick={() => { setAcik(null); guncelle((x) => ({ ...x, oda: o.id })); }}>
              {o.ad}{kalan === 0 ? " ✓" : ""}
            </button>
          );
        })}
      </div>

      <div className="oda-kaydir">
      <div className="oda-sahne">
        <OdaCizim oda={oda.id} />
        {oda.id === "avlu" && <Rain yogunluk={90} opaklik={0.3} />}
        {noktalar.map((n) => {
          const bulundu = d.bulunan.includes(n.id);
          return (
            <button key={n.id} className={`nokta ${bulundu ? "bulundu" : ""}`}
              style={{ left: `${(n.x / 1000) * 100}%`, top: `${(n.y / 620) * 100}%` }}
              onClick={() => incele(n)} aria-label={n.etiket}>
              <span className="nokta-halka" />
              {bulundu && <span className="nokta-etiket">{n.etiket}</span>}
            </button>
          );
        })}
        <div className="oda-not">{oda.aciklama}</div>
      </div>
      </div>
      <p className="kaydir-ipucu">← Sahneyi parmağınla kaydırabilirsin →</p>

      {acik && (
        <div className="bulgu" key={acik.id}>
          <div className="bulgu-bas">
            <b>{acik.etiket}</b>
            <button className="kapat" onClick={() => setAcik(null)} aria-label="Kapat">✕</button>
          </div>
          <p>{acik.metin}</p>
          {acik.verir && <div className="bulgu-kanit">🗂 Kanıt dosyasına eklendi</div>}
        </div>
      )}

      <div className="kesif-alt">
        <div className="ilerleme">
          <div className="ilerleme-yazi">Önemli bulgular <b>{bulunanZorunlu}/{zorunlu.length}</b></div>
          <div className="ilerleme-cubuk"><i style={{ width: `${(100 * bulunanZorunlu) / zorunlu.length}%` }} /></div>
        </div>
        <button className="btn altin" disabled={!tamam} onClick={ilerle}>
          {tamam ? "Karakola dön →" : "Her odayı incele"}
        </button>
      </div>
    </section>
  );
}
