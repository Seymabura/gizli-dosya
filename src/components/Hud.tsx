"use client";

import { useEffect, useState } from "react";
import type { Vaka } from "@/game/types";
import { IPUCU_CEZASI, sureYaz, type OyunDurumu } from "@/game/state";
import KanitKart from "./KanitKart";
import { Tabaka } from "./Ui";

type Panel = null | "canta" | "defter" | "ipucu";

export default function Hud({ vaka, d, guncelle, bolumAdi, onCikis }: {
  vaka: Vaka;
  d: OyunDurumu;
  guncelle: (f: (o: OyunDurumu) => OyunDurumu) => void;
  bolumAdi: string;
  onCikis: () => void;
}) {
  const [panel, setPanel] = useState<Panel>(null);
  const [secili, setSecili] = useState<string | null>(null);
  const [onay, setOnay] = useState(false);
  const [simdi, setSimdi] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setSimdi(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const sure = d.basladi ? (simdi - d.basladi) / 1000 : 0;
  const kanitlar = d.kanitlar.map((id) => vaka.kanitlar.find((k) => k.id === id)).filter((k): k is NonNullable<typeof k> => !!k);
  const seciliKanit = kanitlar.find((k) => k.id === secili);

  return (
    <>
      <header className="hud">
        <button className="hud-btn ikon" onClick={onCikis} aria-label="Ana menü">☰</button>
        <div className="hud-orta">
          <div className="hud-vaka">Vaka #{vaka.no} · {vaka.baslik}</div>
          <div className="hud-bolum">{bolumAdi}</div>
        </div>
        <div className="hud-sag">
          <span className="hud-sure">{sureYaz(sure)}</span>
        </div>
      </header>
      <nav className="hud-alt">
        <button className="hud-btn" onClick={() => { setPanel("canta"); setSecili(null); }}>
          <span className="hud-ikon">🗂</span>Kanıtlar<b>{d.kanitlar.length}</b>
        </button>
        <button className="hud-btn" onClick={() => setPanel("defter")}>
          <span className="hud-ikon">✎</span>Defter
        </button>
        <button className="hud-btn" onClick={() => setPanel("ipucu")}>
          <span className="hud-ikon">✦</span>İpucu<b>{d.ipucu}/{vaka.ipuclari.length}</b>
        </button>
      </nav>

      {panel === "canta" && (
        <Tabaka baslik={seciliKanit ? seciliKanit.baslik : "Kanıt Dosyası"} ust={seciliKanit ? seciliKanit.kod : `${kanitlar.length} kanıt`}
          kapat={() => (seciliKanit ? setSecili(null) : setPanel(null))} genis>
          {seciliKanit ? (
            <>
              <KanitKart k={seciliKanit} />
              <div className="satir-btn">
                <button className="btn hayalet" onClick={() => setSecili(null)}>← Listeye dön</button>
                <button className="btn hayalet" onClick={() => {
                  guncelle((o) => ({ ...o, notlar: (o.notlar ? o.notlar.replace(/\s*$/, "") + "\n" : "") + `[${seciliKanit.kod}] ` }));
                  setPanel("defter");
                }}>✎ Deftere not al</button>
              </div>
            </>
          ) : kanitlar.length === 0 ? (
            <p className="soluk">Henüz kanıt yok. Olay yerini incele.</p>
          ) : (
            <div className="kanit-liste">
              {kanitlar.map((k) => (
                <button key={k.id} className="kanit-satir" onClick={() => setSecili(k.id)}>
                  <span className="kanit-kod">{k.kod}</span>
                  <span><b>{k.baslik}</b><small>{k.kisa}</small></span>
                  <span className="ok">›</span>
                </button>
              ))}
            </div>
          )}
        </Tabaka>
      )}

      {panel === "defter" && (
        <Tabaka baslik="Dedektif Defteri" ust="Otomatik kaydedilir" kapat={() => setPanel(null)}>
          <div className="defter">
            <textarea
              value={d.notlar}
              onChange={(e) => { const v = e.target.value; guncelle((o) => ({ ...o, notlar: v })); }}
              placeholder="Saatler, çelişkiler, şüpheler…"
            />
          </div>
          {d.yakalanan.length > 0 && (
            <div className="sirlar">
              <h4>Ortaya çıkan sırlar</h4>
              {vaka.supheliler.flatMap((s) => s.ifadeler).filter((f) => f.yalan && d.yakalanan.includes(f.id)).map((f) => (
                <p key={f.id}>◆ {f.yalan!.sir}</p>
              ))}
            </div>
          )}
        </Tabaka>
      )}

      {panel === "ipucu" && (
        <Tabaka baslik="İpuçları" ust={`Her ipucu −${IPUCU_CEZASI} puan`} kapat={() => { setPanel(null); setOnay(false); }}>
          <div className="ipuclari">
            {vaka.ipuclari.map((ip, i) => (
              <div key={i} className={`ipucu ${i < d.ipucu ? "acik" : ""}`}>
                <span className="ipucu-no">İPUCU {i + 1}</span>
                {i < d.ipucu ? (
                  <p>{ip}</p>
                ) : i === d.ipucu ? (
                  <button className="btn hayalet" onClick={() => {
                    if (!onay) { setOnay(true); return; }
                    setOnay(false);
                    guncelle((o) => ({ ...o, ipucu: o.ipucu + 1 }));
                  }}>{onay ? "Emin misin? Tekrar dokun" : "İpucunu aç"}</button>
                ) : (
                  <p className="soluk">Önce önceki ipucunu aç.</p>
                )}
              </div>
            ))}
          </div>
        </Tabaka>
      )}
    </>
  );
}
