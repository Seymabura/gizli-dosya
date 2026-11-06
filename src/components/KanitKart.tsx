"use client";

import type { Kanit } from "@/game/types";

const TUR_ADI: Record<Kanit["tur"], string> = {
  kamera: "Kamera kaydı",
  fis: "Döküm",
  foto: "Dijital kanıt",
  belge: "Belge",
  fiziksel: "Fiziksel bulgu",
  ifade: "İfade",
};

/** Bir kanıtın tam görünümü (türüne göre farklı çizilir) */
export default function KanitKart({ k }: { k: Kanit }) {
  return (
    <article className="kanit">
      <header className="kanit-bas">
        <span className="kanit-kod">{k.kod}</span>
        <div>
          <b>{k.baslik}</b>
          <small>{TUR_ADI[k.tur]} · {k.kaynak}</small>
        </div>
      </header>
      <div className="kanit-govde">
        {k.tur === "kamera" && k.satirlar && (
          <div className="cctv">
            {k.satirlar.map(([t, m], i) => (
              <div className="cctv-satir" key={i}><span>{t}</span><span>{m}</span></div>
            ))}
          </div>
        )}

        {k.tur === "fis" && k.fisSatirlar && (
          <div className="fis">
            <div className="fis-bas">{k.fisBaslik}</div>
            {k.fisSatirlar.map((r, i) => (
              <div className="fis-satir" key={i}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span></div>
            ))}
            {k.not && <div className="fis-alt">{k.not}</div>}
          </div>
        )}

        {k.tur === "foto" && (
          <>
            <div className="foto">
              <svg viewBox="0 0 320 200" aria-hidden="true">
                <rect width="320" height="200" fill="#1c1813" />
                <rect x="40" y="28" width="240" height="150" fill="#2c261f" stroke="#4a4036" />
                <rect x="70" y="46" width="180" height="114" fill="#5a4026" />
                <rect x="80" y="55" width="160" height="96" fill="#d2c196" />
                <path d="M90 120 C120 90,150 140,180 100 S230 80,232 110 L232 143 L90 143Z" fill="#9aab82" opacity=".55" />
                <path d="M95 80 Q160 60 225 85" stroke="#6a4c28" fill="none" />
                <text x="160" y="72" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9" fill="#4a3418">DERSAADET · 1876</text>
                <text x="10" y="192" fontFamily="monospace" fontSize="9" fill="#999">IMG_4471 · 20:52:14</text>
              </svg>
            </div>
            {k.meta && (
              <dl className="exif">
                {k.meta.map(([a, b]) => (<div key={a}><dt>{a}</dt><dd>{b}</dd></div>))}
              </dl>
            )}
            {k.mesaj && (
              <div className="sohbet">
                <div className="sohbet-kim">Gönderilen → {k.mesaj.kime}</div>
                <div className="balon">📷 Fotoğraf<br />{k.mesaj.metin}<small>{k.mesaj.saat} ✓✓</small></div>
              </div>
            )}
          </>
        )}

        {k.tur === "belge" && k.belgeler && (
          <div className="belgeler">
            {k.belgeler.map((b) => (
              <div className="kagit" key={b.baslik}><h5>{b.baslik}</h5><p>{b.metin}</p></div>
            ))}
          </div>
        )}

        {(k.tur === "fiziksel" || k.tur === "ifade") && k.maddeler && (
          <ul className={k.tur === "ifade" ? "ifade-liste kagit" : "madde-liste kagit"}>
            {k.maddeler.map((m) => <li key={m}>{m}</li>)}
          </ul>
        )}

        {k.not && k.tur !== "fis" && <p className="kanit-not">{k.not}</p>}
      </div>
    </article>
  );
}
