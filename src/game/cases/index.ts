import type { Vaka, YakindaVaka } from "../types";
import { modaHarita } from "./moda-harita";

/** Oynanabilir bütün vakalar */
export const VAKALAR: Vaka[] = [modaHarita];

/** Ana sayfada "Günün Vakası" olarak gösterilen vaka */
export const GUNUN_VAKASI_ID = "vaka-014";

/** Arşivde "Yakında" diye görünen vakalar */
export const YAKINDA: YakindaVaka[] = [
  { no: 15, baslik: "Kar Altındaki Dağ Evi", kategori: "Kapalı Oda", zorluk: "zor" },
  { no: 16, baslik: "Sunucu Odasında Sessizlik", kategori: "Siber Suçlar", zorluk: "uzman" },
  { no: 17, baslik: "Galata'da Kayıp Mühür", kategori: "Tarihi Gizem", zorluk: "kolay" },
  { no: 18, baslik: "Yönetim Kurulu Sızıntısı", kategori: "Kurumsal Casusluk", zorluk: "orta" },
];

export const SEVIYELER = {
  kolay: { ad: "Kolay", rutbe: "Çaylak" },
  orta: { ad: "Orta", rutbe: "Dedektif" },
  zor: { ad: "Zor", rutbe: "Başkomiser" },
  uzman: { ad: "Uzman", rutbe: "Sherlock" },
} as const;

export const vakaBul = (id: string) => VAKALAR.find((v) => v.id === id);
