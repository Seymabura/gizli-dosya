"use client";

import { useEffect, useState } from "react";
import { GUNUN_VAKASI_ID, SEVIYELER, VAKALAR, YAKINDA, vakaBul } from "@/game/cases";
import { kayitOku } from "@/game/state";
import type { Zorluk } from "@/game/types";
import Rain from "./Rain";
import { Tabaka } from "./Ui";

/** Açılış ekranı: günün vakası, arşiv, nasıl oynanır */
export default function Baslik({ basla }: { basla: (id: string) => void }) {
  const gunun = vakaBul(GUNUN_VAKASI_ID)!;
  const [kalan, setKalan] = useState("--:--:--");
  const [durum, setDurum] = useState<"yeni" | "devam" | "bitti">("yeni");
  const [panel, setPanel] = useState<null | "arsiv" | "nasil">(null);
  const [filtre, setFiltre] = useState<"hepsi" | Zorluk>("hepsi");

  useEffect(() => {
    const k = kayitOku(gunun.id);
    setDurum(k?.sonuc ? "bitti" : k?.basladi ? "devam" : "yeni");
    const t = () => {
      const n = new Date(), m = new Date(n);
      m.setHours(24, 0, 0, 0);
      const s = Math.floor((m.getTime() - n.getTime()) / 1000);
      setKalan([Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((x) => String(x).padStart(2, "0")).join(":"));
    };
    t();
    const i = setInterval(t, 1000);
    return () => clearInterval(i);
  }, [gunun.id]);

  const liste = [
    ...VAKALAR.map((v) => ({ no: v.no, baslik: v.baslik, kategori: v.kategori, zorluk: v.zorluk, id: v.id as string | null })),
    ...YAKINDA.map((v) => ({ ...v, id: null as string | null })),
  ].filter((v) => filtre === "hepsi" || v.zorluk === filtre).sort((a, b) => a.no - b.no);

  return (
    <section className="baslik">
      <Rain />
      <div className="baslik-isik" />
      <div className="baslik-ic">
        <div className="logo">
          <span className="logo-ust">her gece yarısı yeni bir vaka</span>
          <h1>GİZLİ<br /><em>DOSYA</em></h1>
        </div>

        <div className="dosya gunun">
          <div className="dosya-serit" />
          <div className="gunun-ust">
            <span className="ust-baslik koyu">Günün Vakası · #{gunun.no}</span>
            <span className="damga-kucuk">GİZLİ</span>
          </div>
          <h2>{gunun.baslik}</h2>
          <p className="kanca">{gunun.giris}</p>
          <div className="etiketler">
            <span className={`etiket z-${gunun.zorluk}`}>{SEVIYELER[gunun.zorluk].ad} · {SEVIYELER[gunun.zorluk].rutbe}</span>
            <span className="etiket">{gunun.kategori}</span>
            <span className="etiket">{gunun.konum}</span>
          </div>
          <div className="gunun-alt">
            <div className="geri-sayim">Yeni vakaya<br /><b>{kalan}</b></div>
            <button className="btn koyu" onClick={() => basla(gunun.id)}>
              {durum === "bitti" ? "Sonucu gör" : durum === "devam" ? "Devam et" : "Soruşturmaya başla"} →
            </button>
          </div>
        </div>

        <div className="menu-btn">
          <button className="btn hayalet" onClick={() => setPanel("arsiv")}>Vaka arşivi</button>
          <button className="btn hayalet" onClick={() => setPanel("nasil")}>Nasıl oynanır?</button>
        </div>
      </div>

      {panel === "arsiv" && (
        <Tabaka baslik="Vaka Arşivi" ust={`${liste.length} dosya`} kapat={() => setPanel(null)}>
          <div className="filtreler">
            {(["hepsi", "kolay", "orta", "zor", "uzman"] as const).map((f) => (
              <button key={f} className={filtre === f ? "acik" : ""} onClick={() => setFiltre(f)}>
                {f === "hepsi" ? "Tümü" : SEVIYELER[f].rutbe}
              </button>
            ))}
          </div>
          <div className="arsiv">
            {liste.map((v) => (
              <button key={v.no} className={`arsiv-satir ${v.id ? "" : "kilitli"}`} disabled={!v.id} onClick={() => v.id && basla(v.id)}>
                <span className="no">#{v.no}</span>
                <span className="ad"><b>{v.baslik}</b><small>{v.kategori}</small></span>
                <span className={`etiket z-${v.zorluk}`}>{SEVIYELER[v.zorluk].ad}</span>
                {!v.id && <span className="soluk kucuk-yazi">Yakında</span>}
              </button>
            ))}
            {liste.length === 0 && <p className="soluk">Bu seviyede henüz vaka yok.</p>}
          </div>
        </Tabaka>
      )}

      {panel === "nasil" && (
        <Tabaka baslik="Nasıl oynanır?" kapat={() => setPanel(null)}>
          <ol className="nasil">
            <li><b>Hikâye.</b> Ekrana dokunarak diyalogları ilerlet.</li>
            <li><b>Olay yeri.</b> Odaları gez, parlayan noktalara dokun. Bulduğun kanıtlar dosyana eklenir.</li>
            <li><b>Sorgu.</b> Şüphelilerin ifadelerini dinle. Bir yalan yakaladığında doğru kanıtı göster. Yanlış kanıt başkomiserin sabrını azaltır.</li>
            <li><b>Pano.</b> Şüphelileri ve kanıtları kırmızı iple bağla, kafanda tabloyu kur.</li>
            <li><b>Savcılık.</b> Suçluyu, yalanını çürüten kanıtı ve nedenini seç. İki hakkın var.</li>
          </ol>
          <p className="soluk">Her vaka sadece dosyadaki bilgilerle çözülebilir. Dış bilgi gerekmez.</p>
        </Tabaka>
      )}
    </section>
  );
}
