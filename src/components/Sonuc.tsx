"use client";

import { useState } from "react";
import type { Vaka } from "@/game/types";
import { MAKS_DENEME, sureYaz, type OyunDurumu } from "@/game/state";
import Rain from "./Rain";

export default function Sonuc({ vaka, d, anaMenu, bastan }: {
  vaka: Vaka;
  d: OyunDurumu;
  anaMenu: () => void;
  bastan: () => void;
}) {
  const [kopyalandi, setKopyalandi] = useState(false);
  const s = d.sonuc!;
  const url = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const metin = [
    s.cozuldu ? `🕵️‍♂️ Günün Vakası #${vaka.no} çözüldü!` : `🕵️‍♂️ Günün Vakası #${vaka.no} bu sefer beni yendi.`,
    `⏱️ Süre: ${sureYaz(s.sure)} | 🔍 İpucu: ${d.ipucu}/${vaka.ipuclari.length} | 🏆 Rütbe: ${s.rutbe}`,
    `Gerçeği görebilecek misin? ${url}`,
  ].join("\n");

  const kopyala = async () => {
    try { await navigator.clipboard.writeText(metin); setKopyalandi(true); setTimeout(() => setKopyalandi(false), 1800); }
    catch { /* pano izni yoksa metin zaten ekranda */ }
  };
  const celiskiSayisi = vaka.supheliler.filter((sp) => sp.ifadeler.some((f) => f.yalan && d.yakalanan.includes(f.id))).length;

  return (
    <section className="sonuc">
      <Rain yogunluk={80} opaklik={0.25} />
      <div className="sonuc-ic">
        <div className="dosya sonuc-kart">
          <div className="dosya-serit" />
          <div className="ust-baslik koyu">Vaka #{vaka.no} · {vaka.baslik}</div>
          <div className="damga-buyuk">{s.cozuldu ? "ÇÖZÜLDÜ" : "DOSYA KAPANDI"}</div>
          <h2>{s.cozuldu ? "Gerçeği buldun." : "Bu sefer suçlu kaçtı."}</h2>
          <div className="istatistik">
            <div><small>Süre</small><b>{sureYaz(s.sure)}</b></div>
            <div><small>İpucu</small><b>{d.ipucu}/{vaka.ipuclari.length}</b></div>
            <div><small>Doğruluk</small><b>%{s.dogruluk}</b></div>
            <div><small>Çelişki</small><b>{celiskiSayisi}/{vaka.supheliler.length}</b></div>
            <div><small>Deneme</small><b>{d.deneme}/{MAKS_DENEME}</b></div>
            <div><small>Puan</small><b>{s.puan}</b></div>
          </div>
          <div className="ust-baslik koyu">Rütben</div>
          <div className="rutbe">{s.rutbe}</div>
        </div>

        <pre className="paylas-metin">{metin}</pre>
        <div className="satir-btn">
          <a className="btn x" href={`https://x.com/intent/post?text=${encodeURIComponent(metin)}`} target="_blank" rel="noopener noreferrer">𝕏&apos;te paylaş</a>
          <button className="btn hayalet" onClick={kopyala}>{kopyalandi ? "Kopyalandı ✓" : "Metni kopyala"}</button>
        </div>

        <details className="cozum">
          <summary>📁 Çözüm dosyası</summary>
          <div className="kagit">
            <h5>Sonuç</h5>
            <p>{vaka.cozum.ozet}</p>
            <h5>Diğerleri neden suçsuz?</h5>
            {vaka.cozum.eleme.map((e) => <p key={e.ad}><b>{e.ad}:</b> {e.metin}</p>)}
          </div>
        </details>

        <div className="satir-btn">
          <button className="btn altin" onClick={anaMenu}>Ana menü</button>
          <button className="btn hayalet" onClick={bastan}>Baştan oyna</button>
        </div>
      </div>
    </section>
  );
}
