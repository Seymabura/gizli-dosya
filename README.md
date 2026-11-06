# Gizli Dosya

Sinematik noir bir dedektif oyunu. Her gün yeni bir vaka.

**Akış:** Hikâye → Olay yeri keşfi → Merkezden dosyalar → Sorgu odası → Dedektif panosu → Savcılık → Final

## Çalıştırma

```bash
npm install
npm run dev
```

Sonra tarayıcıda http://localhost:3000 adresini aç.

## Klasörler

| Yer | Ne var |
|---|---|
| `src/game/types.ts` | Vaka veri yapısı |
| `src/game/cases/` | Vakalar (her vaka bir dosya) |
| `src/game/cases/index.ts` | Günün vakası ve arşiv listesi |
| `src/game/state.ts` | Oyun durumu, kayıt, puan ve rütbe |
| `src/components/` | Ekranlar: Baslik, Diyalog, Kesif, Sorgu, Pano, Suclama, Sonuc |
| `src/components/Art.tsx` | Portreler, sahne ve oda çizimleri |

## Yeni vaka eklemek

1. `src/game/cases/moda-harita.ts` dosyasını kopyala, yeni adla kaydet.
2. İçeriği değiştir (sahneler, odalar, noktalar, kanıtlar, şüpheliler, çözüm).
3. `src/game/cases/index.ts` içinde `VAKALAR` listesine ekle.

## Paylaşım linki

Vercel'de `NEXT_PUBLIC_SITE_URL` ortam değişkenine sitenin adresini yazarsan paylaşım metni o adresi kullanır.
