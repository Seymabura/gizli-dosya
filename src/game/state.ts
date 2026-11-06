"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Vaka } from "./types";

export const MAKS_DENEME = 2;
export const MAKS_SABIR = 5;
export const IPUCU_CEZASI = 12;

export interface PanoKart {
  id: string; // "s:selin" veya "k:K4"
  x: number; // yüzde
  y: number; // yüzde
}

export interface Sonuc {
  cozuldu: boolean;
  sure: number; // saniye
  puan: number;
  rutbe: string;
  dogruluk: number; // yüzde
}

export interface OyunDurumu {
  basladi: number | null; // zaman damgası
  bitis: number | null; // suçlamanın bittiği an
  bolum: number; // vaka.bolumler içindeki sıra
  sahneSatir: number; // hikâye sahnesinde kaçıncı satırda
  kanitlar: string[]; // çantadaki kanıt id'leri
  bulunan: string[]; // olay yerinde bulunan nokta id'leri
  oda: string;
  yakalanan: string[]; // çürütülen ifade id'leri
  gorusulen: string[]; // sorgulanan şüpheliler
  sabir: number;
  yanlisKanit: number;
  ipucu: number;
  deneme: number;
  dogruParca: number;
  toplamParca: number;
  notlar: string;
  pano: { kartlar: PanoKart[]; baglar: [string, string][] };
  final: "dogru" | "yanlis" | null;
  sonuc: Sonuc | null;
}

export const yeniDurum = (): OyunDurumu => ({
  basladi: null,
  bitis: null,
  bolum: 0,
  sahneSatir: 0,
  kanitlar: [],
  bulunan: [],
  oda: "on",
  yakalanan: [],
  gorusulen: [],
  sabir: MAKS_SABIR,
  yanlisKanit: 0,
  ipucu: 0,
  deneme: 0,
  dogruParca: 0,
  toplamParca: 0,
  notlar: "",
  pano: { kartlar: [], baglar: [] },
  final: null,
  sonuc: null,
});

const anahtar = (id: string) => `gizlidosya:v2:${id}`;

export function kayitOku(id: string): OyunDurumu | null {
  try {
    const ham = localStorage.getItem(anahtar(id));
    return ham ? { ...yeniDurum(), ...JSON.parse(ham) } : null;
  } catch {
    return null;
  }
}

function kayitYaz(id: string, d: OyunDurumu) {
  try {
    localStorage.setItem(anahtar(id), JSON.stringify(d));
  } catch {
    /* depolama kapalıysa sessizce geç */
  }
}

export function kayitSil(id: string) {
  try {
    localStorage.removeItem(anahtar(id));
  } catch {
    /* yok say */
  }
}

/** Puan ve rütbe hesabı */
export function puanla(d: OyunDurumu, vaka: Vaka, cozuldu: boolean, sure: number): Sonuc {
  const dogruluk = d.toplamParca ? Math.round((100 * d.dogruParca) / d.toplamParca) : 0;
  if (!cozuldu) return { cozuldu, sure, puan: 0, rutbe: "Stajyer", dogruluk };
  let p = 100;
  p -= d.ipucu * IPUCU_CEZASI;
  p -= (d.deneme - 1) * 25;
  p -= d.yanlisKanit * 4;
  p += Math.min(d.yakalanan.length, vaka.supheliler.length) * 2;
  const dk = sure / 60;
  if (dk > 15) p -= Math.min(15, Math.floor(dk - 15));
  p = Math.max(5, Math.min(100, p));
  const rutbe = p >= 95 ? "Sherlock" : p >= 80 ? "Başkomiser" : p >= 60 ? "Dedektif" : "Çaylak";
  return { cozuldu, sure, puan: p, rutbe, dogruluk };
}

/** Oyun durumunu yöneten kanca: her değişiklik tarayıcıya kaydedilir */
export function useOyun(vaka: Vaka) {
  const [d, setD] = useState<OyunDurumu>(yeniDurum);
  const [hazir, setHazir] = useState(false);
  const ilk = useRef(true);

  useEffect(() => {
    const k = kayitOku(vaka.id);
    if (k) setD(k);
    setHazir(true);
  }, [vaka.id]);

  useEffect(() => {
    if (ilk.current) {
      ilk.current = false;
      return;
    }
    if (hazir) kayitYaz(vaka.id, d);
  }, [d, hazir, vaka.id]);

  const guncelle = useCallback((f: (o: OyunDurumu) => OyunDurumu) => setD((o) => f(o)), []);

  const sifirla = useCallback(() => {
    kayitSil(vaka.id);
    setD(yeniDurum());
  }, [vaka.id]);

  return { d, guncelle, sifirla, hazir };
}

export const sureYaz = (sn: number) => {
  sn = Math.max(0, Math.floor(sn));
  return `${String(Math.floor(sn / 60)).padStart(2, "0")}:${String(sn % 60).padStart(2, "0")}`;
};
