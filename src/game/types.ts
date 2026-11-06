// =====================================================================
// GİZLİ DOSYA — Veri yapısı
// Yeni bir vaka yazmak = src/game/cases/ içine bu tiplere uyan bir dosya eklemek.
// =====================================================================

export type Zorluk = "kolay" | "orta" | "zor" | "uzman";

/** Hikâye sahnelerinin arka planı */
export type SahneArkaPlan = "sokak" | "dukkan" | "ofis" | "sorgu";

/** Portre çizimi için görünüm seçenekleri */
export interface PortreGorunum {
  sac: "kel" | "kisa" | "uzun" | "kakul" | "kapusonlu" | "geriye";
  aksesuar?: ("fotr" | "gozluk" | "yuvarlakGozluk" | "kupe" | "biyik" | "fular")[];
  renk: string; // kenar ışığı rengi
}

export interface Karakter {
  id: string;
  ad: string;
  rol: string;
  portre?: PortreGorunum; // yoksa portre gösterilmez (anlatıcı, sen)
}

/** Diyalogdaki tek bir satır. who: karakter id'si, "anlatici" ya da "sen" */
export interface Satir {
  who: string;
  text: string;
}

export interface HikayeSahnesi {
  id: string;
  arkaPlan: SahneArkaPlan;
  baslik: string;
  satirlar: Satir[];
  /** Sahne bitince kanıt çantasına eklenecek kanıtlar */
  verir?: string[];
}

export type KanitTuru = "kamera" | "fis" | "foto" | "belge" | "fiziksel" | "ifade";

export interface Kanit {
  id: string;
  kod: string;
  baslik: string;
  /** Listelerde görünen tek cümlelik özet */
  kisa: string;
  tur: KanitTuru;
  kaynak: string;
  satirlar?: [string, string][]; // kamera kaydı
  fisBaslik?: string;
  fisSatirlar?: [string, string, string][];
  meta?: [string, string][]; // fotoğraf bilgileri
  mesaj?: { kime: string; saat: string; metin: string };
  belgeler?: { baslik: string; metin: string }[];
  maddeler?: string[]; // fiziksel kanıt / ifade maddeleri
  not?: string;
}

export interface Oda {
  id: string;
  ad: string;
  aciklama: string;
}

/** Olay yerinde dokunulabilen nokta. x, y: 1000×620'lik çizim üzerinde konum */
export interface IlgiNoktasi {
  id: string;
  oda: string;
  x: number;
  y: number;
  etiket: string;
  metin: string;
  verir?: string; // kanıt id'si
  zorunlu?: boolean; // ilerlemek için bulunması gereken nokta
}

export interface Ifade {
  id: string;
  metin: string;
  /** "Üstüne git" denince verilen cevap */
  bastir: string;
  /** Bu ifade yalansa: hangi kanıt(lar) çürütür, ne olur */
  yalan?: {
    kanitlar: string[];
    tepki: Satir[];
    sir: string;
  };
}

export interface Supheli {
  id: string;
  ad: string;
  yas: number;
  meslek: string;
  iliski: string;
  giris: Satir[];
  ifadeler: Ifade[];
}

export type Bolum =
  | { tur: "hikaye"; sahne: string; baslik: string }
  | { tur: "kesif"; baslik: string }
  | { tur: "sorgu"; baslik: string }
  | { tur: "pano"; baslik: string }
  | { tur: "suclama"; baslik: string };

export interface Motivasyon {
  id: string;
  metin: string;
  aciklama: string;
}

export interface Vaka {
  id: string;
  no: number;
  baslik: string;
  zorluk: Zorluk;
  kategori: string;
  konum: string;
  giris: string;
  karakterler: Karakter[];
  bolumler: Bolum[];
  sahneler: HikayeSahnesi[];
  odalar: Oda[];
  noktalar: IlgiNoktasi[];
  kanitlar: Kanit[];
  supheliler: Supheli[];
  ipuclari: string[];
  motivasyonlar: Motivasyon[];
  dogru: { supheli: string; kanit: string; motivasyon: string };
  finalDogru: HikayeSahnesi;
  finalYanlis: HikayeSahnesi;
  cozum: {
    ozet: string;
    eleme: { ad: string; metin: string }[];
  };
}

export interface YakindaVaka {
  no: number;
  baslik: string;
  kategori: string;
  zorluk: Zorluk;
}
