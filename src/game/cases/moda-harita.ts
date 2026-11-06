import type { Vaka } from "../types";

// =====================================================================
// VAKA #14 — Moda'da Kayıp Harita (Orta)
// Çözüm bu dosyanın en altında. Oynamadan okuma!
// =====================================================================

export const modaHarita: Vaka = {
  id: "vaka-014",
  no: 14,
  baslik: "Moda'da Kayıp Harita",
  zorluk: "orta",
  kategori: "Şehir Gizemi",
  konum: "Moda, Kadıköy",
  giris:
    "Kırk yıllık bir sahaf. Bir imza günü. Dört şüpheli. Ve kapanışta yerinde olmayan 150 yıllık bir harita.",

  karakterler: [
    { id: "anlatici", ad: "", rol: "" },
    { id: "sen", ad: "Sen", rol: "Dedektif" },
    { id: "halit", ad: "Halit Demir", rol: "Başkomiser", portre: { sac: "kisa", aksesuar: ["fotr", "biyik"], renk: "#d4af37" } },
    { id: "nevzat", ad: "Nevzat Ilgaz", rol: "Dükkân sahibi, 68", portre: { sac: "kel", aksesuar: ["gozluk"], renk: "#c9b48a" } },
    { id: "selin", ad: "Selin Aydın", rol: "Kasiyer, 23", portre: { sac: "uzun", renk: "#7fb4c9" } },
    { id: "kerem", ad: "Kerem Taşkın", rol: "Koleksiyoncu, 47", portre: { sac: "geriye", aksesuar: ["yuvarlakGozluk", "fular"], renk: "#b98ad4" } },
    { id: "defne", ad: "Defne Kara", rol: "Yazar, 34", portre: { sac: "kakul", aksesuar: ["kupe"], renk: "#d48a8a" } },
    { id: "murat", ad: "Murat Eren", rol: "Yeğen, 38", portre: { sac: "kapusonlu", renk: "#8ad4a4" } },
  ],

  bolumler: [
    { tur: "hikaye", sahne: "giris", baslik: "Bölüm 1 · Gece Yarısı Çağrısı" },
    { tur: "kesif", baslik: "Bölüm 2 · Olay Yeri" },
    { tur: "hikaye", sahne: "raporlar", baslik: "Bölüm 3 · Merkezden Dosyalar" },
    { tur: "sorgu", baslik: "Bölüm 4 · Sorgu Odası" },
    { tur: "pano", baslik: "Bölüm 5 · Dedektif Panosu" },
    { tur: "suclama", baslik: "Bölüm 6 · Savcılık" },
  ],

  sahneler: [
    {
      id: "giris",
      arkaPlan: "sokak",
      baslik: "Gece Yarısı Çağrısı",
      satirlar: [
        { who: "anlatici", text: "Moda. Cuma gecesi, saat 22:03. Yağmur üç saattir Kadıköy'ün kaldırımlarını dövüyor." },
        { who: "anlatici", text: "Telefon çaldığında ceketini daha yeni asmıştın." },
        { who: "halit", text: "Uyuma daha. Moda'da bir sahaf soyulmuş. 150 yıllık bir harita, 2,4 milyon lira." },
        { who: "sen", text: "Bir harita mı? Bu saatte?" },
        { who: "halit", text: "Bir harita. O sırada dükkânın içinde dört kişi varmış. Hepsi masum olduğunu söylüyor. Tabii." },
        { who: "anlatici", text: "Eski Harf. Vitrin camında yağmur damlaları, içeride kâğıt ve toz kokusu. Yaşlı adam tezgâhın arkasında, elleri titriyor." },
        { who: "nevzat", text: "Kırk yıl… Kırk yıldır bu dükkândayım. Bir kez bile bir şey çalınmadı." },
        { who: "nevzat", text: "Vitrinin şifresini bir ben bilirim, bir de yeğenim Murat. Stok sayımını o yapar." },
        { who: "nevzat", text: "Arka kapının iki anahtarı var. Biri bende, bütün akşam belimdeydi. Diğeri Murat'ta, teslimatları o karşılar." },
        { who: "nevzat", text: "Saat 20:50'de Kerem Bey haritayı son bir kez görmek istedi. Vitrini açtım, fotoğrafını çekti, kapatıp kilitledim. Şifreyi girerken arkamdaydı… görmüş olabilir." },
        { who: "nevzat", text: "Murat geçen ay benden 300 bin lira istedi. “Kriptoda battım, alacaklılar kapıda” dedi. Vermedim. Aramız biraz bozuldu." },
        { who: "nevzat", text: "21:40'a kadar ön salondan ayrılmadım. Arka odaya geçtiğimde… vitrin bomboştu." },
        { who: "halit", text: "Dükkân senin. Her köşeye bak, hiçbir şeyi atlama. Ben şüphelileri karakolda bekletiyorum." },
      ],
      verir: ["N1"],
    },
    {
      id: "raporlar",
      arkaPlan: "ofis",
      baslik: "Merkezden Dosyalar",
      satirlar: [
        { who: "anlatici", text: "Karakol. Gece 01:10. Çay soğumuş, kalorifer tıkırdıyor." },
        { who: "halit", text: "Savcılık izinleri geldi. Sana üç dosya var." },
        { who: "halit", text: "Bir: Kerem Taşkın'ın telefonu. Haritanın fotoğrafını çekmiş, üstüne bir de mesaj atmış." },
        { who: "halit", text: "İki: Murat Eren'in İstanbulkart dökümü. Vapurla eve gittim diyor ya, bakalım." },
        { who: "halit", text: "Üç: Kerem'in gittiği meyhanenin adisyonu ve Defne Kara'nın taksi kaydı." },
        { who: "halit", text: "Dördü de sorgu odasında. Yalan söyleyeni yakala. Ama boş yere kanıt sallarsan sabrım tükenir, ona göre." },
      ],
      verir: ["K3", "K4", "K6"],
    },
  ],

  odalar: [
    { id: "on", ad: "Ön Salon", aciklama: "Etkinlik alanı, imza masası ve kasa." },
    { id: "arka", ad: "Arka Oda", aciklama: "Nadir eserler vitrini, tuvalet ve avluya açılan çelik kapı." },
    { id: "avlu", ad: "Avlu", aciklama: "Dükkânın arkası. Bahçe kapısı Leylak Sokak'a açılıyor." },
  ],

  noktalar: [
    // ÖN SALON
    { id: "raf", oda: "on", x: 150, y: 250, etiket: "Kitap rafı", zorunlu: true, verir: "F5",
      metin: "Defne Kara'nın emanet bıraktığı “Kuyu” romanlarının durduğu raf. Sayım tutmuyor: 6 kitap eksik ve satış kaydı yok." },
    { id: "kasa-kamerasi", oda: "on", x: 925, y: 80, etiket: "Kasa kamerası", zorunlu: true, verir: "K1",
      metin: "Tavan köşesindeki kamera ön salonu ve arka odaya açılan iç kapıyı görüyor. Kaydı aldın." },
    { id: "on-kapi-kamerasi", oda: "on", x: 500, y: 70, etiket: "Ön kapı kamerası", zorunlu: true, verir: "K2",
      metin: "Ön kapının üstünde ikinci bir kamera. Dükkâna kim girdi, kim çıktı, hepsi burada." },
    { id: "imza-masasi", oda: "on", x: 420, y: 440, etiket: "İmza masası",
      metin: "Defne Kara'nın masası. İmzalı kitaplar, bir dolma kalem, yarım kalmış bir liste. Masanın yeri arka odanın kapısını görmüyor." },
    { id: "bardaklar", oda: "on", x: 600, y: 405, etiket: "Kâğıt bardaklar",
      metin: "Masada kâğıt bardaklar var. Hepsi dükkânın kendi demliğinden. Karşıdaki kafenin logolu bardağından tek bir tane bile yok." },

    // ARKA ODA
    { id: "vitrin", oda: "arka", x: 500, y: 300, etiket: "Vitrin", zorunlu: true, verir: "F1",
      metin: "Cam sağlam. 4 haneli şifreli kilit zorlanmamış; biri doğru şifreyi girmiş." },
    { id: "etiket", oda: "arka", x: 715, y: 245, etiket: "Vitrin etiketi", zorunlu: true, verir: "F4",
      metin: "Pirinç etiket: “Dersaadet Haritası, 1876. Ahşap çerçeveli, 64 × 48 cm.” Harita çerçevesiyle birlikte gitmiş." },
    { id: "wc-pencere", oda: "arka", x: 140, y: 215, etiket: "Tuvalet penceresi", zorunlu: true, verir: "F3",
      metin: "Pervazda taze sigara külü ve bir izmarit. Pencere demir parmaklıklı, aralık 12 cm. Buradan kimse geçemez." },
    { id: "arka-kapi", oda: "arka", x: 870, y: 300, etiket: "Arka çelik kapı", zorunlu: true, verir: "F2",
      metin: "Kilitsiz bulunmuş. Zorlama izi yok. Bu kilit içeriden de dışarıdan da yalnızca anahtarla açılıyor." },
    { id: "koliler", oda: "arka", x: 300, y: 520, etiket: "Koliler",
      metin: "Teslimat kolileri. Birinin üstünde keçeli kalemle yazılmış: “Murat — sayım”." },

    // AVLU
    { id: "komsu-kamera", oda: "avlu", x: 935, y: 305, etiket: "Karşı apartmanın kapı zili", zorunlu: true, verir: "K5",
      metin: "Sokağın karşısındaki apartmanın kapı zilinde küçük bir kamera var ve avlu kapısını tam karşıdan görüyor. Komşu kaydı vermeyi kabul etti." },
    { id: "bahce-kapisi", oda: "avlu", x: 775, y: 345, etiket: "Bahçe kapısı",
      metin: "Leylak Sokak'a açılan demir kapı. Kilidi yok, sürgüsü dışarıdan da açılabiliyor." },
    { id: "ayak-izi", oda: "avlu", x: 420, y: 530, etiket: "Çamurda izler",
      metin: "Islak toprakta silik ayak izleri var ama yağmur hepsini bozmuş. Kime ait oldukları anlaşılmıyor." },
    { id: "saksilar", oda: "avlu", x: 270, y: 395, etiket: "Saksılar",
      metin: "Hiçbir şey devrilmemiş, her şey yerli yerinde. Hırsız acele etmemiş… ya da yolu çok iyi biliyordu." },
  ],

  kanitlar: [
    {
      id: "N1", kod: "N-1", baslik: "Nevzat Ilgaz'ın İfadesi", tur: "ifade", kaynak: "Mağdur ifadesi · olay yeri",
      kisa: "Şifreyi ve arka kapı anahtarını kimin bildiği; Murat'ın borcu.",
      maddeler: [
        "Vitrinin şifresini sadece Nevzat ve yeğeni Murat biliyor.",
        "Arka kapının iki anahtarı var: biri Nevzat'ta (akşam boyu belindeydi), diğeri Murat'ta.",
        "20:50'de Kerem için vitrini açtı, Kerem fotoğraf çekti, sonra vitrin kilitlendi. Kerem şifreyi görmüş olabilir.",
        "Murat geçen ay 300 bin TL borç istedi (“Kriptoda battım”). Nevzat vermedi.",
        "Nevzat 21:40'a kadar ön salondan ayrılmadı.",
      ],
    },
    {
      id: "K1", kod: "K-1", baslik: "Kasa Kamerası Kaydı", tur: "kamera", kaynak: "CAM-01 · Ön salon ve arka oda iç kapısı",
      kisa: "Kim, ne zaman arka odaya girip çıktı.",
      satirlar: [
        ["19:30–21:20", "Defne imza masasında. Arka odaya hiç girmiyor."],
        ["20:15", "Selin arka odaya giriyor."],
        ["20:27", "Selin arka odadan çıkıyor, kasaya dönüyor."],
        ["20:30–21:45", "Selin kasada; kadrajdan hiç çıkmıyor."],
        ["20:35", "Murat arka odaya giriyor."],
        ["20:38", "Murat arka odadan çıkıyor."],
        ["20:50", "Nevzat ve Kerem arka odaya giriyor."],
        ["20:53", "Nevzat ve Kerem arka odadan çıkıyor."],
        ["20:53–21:40", "Arka oda kapısından geçen kimse yok."],
        ["21:40", "Nevzat arka odaya giriyor."],
      ],
      not: "Nevzat 19:00–21:40 arasında, 20:50–20:53 dışında, sürekli ön salonda görünüyor.",
    },
    {
      id: "K2", kod: "K-2", baslik: "Ön Kapı Kamerası", tur: "kamera", kaynak: "CAM-02 · Moda Caddesi girişi",
      kisa: "Dükkâna kim girdi, kim çıktı.",
      satirlar: [
        ["19:00–19:25", "Misafirler giriyor (toplam 16 kişi)."],
        ["19:25–20:40", "Giriş ya da çıkış yok."],
        ["20:40", "Murat Eren çıkıyor."],
        ["20:45–21:00", "12 izleyici çıkıyor."],
        ["21:05", "Kerem Taşkın çıkıyor."],
        ["21:25", "Defne Kara çıkıyor. Kolunun altında yaklaşık 25 × 18 cm'lik kahverengi bir paket var."],
        ["21:25–21:55", "Giriş ya da çıkış yok."],
      ],
    },
    {
      id: "K3", kod: "K-3", baslik: "Kerem Taşkın'ın Telefonu", tur: "foto", kaynak: "Adli inceleme · Galeri ve mesajlar",
      kisa: "Haritanın 20:52'de çekilmiş fotoğrafı ve Londra'ya giden mesaj.",
      meta: [
        ["Dosya", "IMG_4471.HEIC"],
        ["Çekim zamanı", "06.11 · 20:52:14"],
        ["Konum", "Moda, Kadıköy"],
        ["İçerik", "Harita vitrinde, çerçevesinin içinde."],
      ],
      mesaj: { kime: "J. Whitmore (Londra)", saat: "20:54", metin: "Harita hâlâ yerinde, fotoğraf ekte. Adam satmıyor. Pazartesi son teklifi götüreceğim." },
    },
    {
      id: "K4", kod: "K-4", baslik: "Murat'ın İstanbulkart Dökümü", tur: "fis", kaynak: "Ulaşım kartı hareketleri · 6 Kasım",
      kisa: "Murat'ın kartının o akşamki kullanımları.",
      fisBaslik: "İSTANBULKART · HAREKET DÖKÜMÜ",
      fisSatirlar: [
        ["18:20", "Üsküdar İskelesi", "Vapur"],
        ["21:47", "Kadıköy İskelesi", "Vapur"],
      ],
      not: "Bu tarihte başka kullanım bulunmamaktadır.",
    },
    {
      id: "K5", kod: "K-5", baslik: "Komşu Kapı Zili Kamerası", tur: "kamera", kaynak: "Leylak Sk. No:7 · Avlu kapısının tam karşısı",
      kisa: "Avluya giren ve büyük bir nesneyle çıkan kapüşonlu kişi.",
      satirlar: [
        ["21:12:40", "Kapüşonlu biri sokaktan avluya giriyor. Elleri boş."],
        ["21:31:08", "Kapüşonlu biri avludan çıkıyor. Battaniyeye sarılı, büyük, düz, dikdörtgen bir nesne taşıyor; nesne gövdesinden geniş. İskele yönüne yürüyor."],
        ["21:00–22:00", "Bu iki kayıt dışında avluya giren ya da çıkan yok."],
      ],
      not: "Görüntü karanlık; yüz, boy ve kıyafet net seçilemiyor.",
    },
    {
      id: "K6", kod: "K-6", baslik: "Alibi Belgeleri", tur: "belge", kaynak: "Polisin topladığı belgeler",
      kisa: "Kerem'in meyhane adisyonu ve Defne'nin taksi kaydı.",
      belgeler: [
        { baslik: "Meyhane adisyonu · Masa 4", metin: "Kerem Taşkın adına 21:10'da açıldı, 23:05'te kapandı. Garson: “Kerem Bey masadan hiç kalkmadı.”" },
        { baslik: "Taksi uygulaması kaydı", metin: "Yolcu: Defne Kara. Biniş 21:26, Eski Harf önü. İniş 22:04, Beşiktaş." },
      ],
    },
    {
      id: "F1", kod: "F-1", baslik: "Vitrin Kilidi", tur: "fiziksel", kaynak: "Arka oda",
      kisa: "Kilit zorlanmamış, doğru şifreyle açılmış.",
      maddeler: ["Cam kırılmamış.", "4 haneli şifreli kilit zorlanmadan, doğru şifreyle açılmış."],
    },
    {
      id: "F2", kod: "F-2", baslik: "Arka Çelik Kapı", tur: "fiziksel", kaynak: "Arka oda → avlu",
      kisa: "Kilitsiz bulundu; sadece anahtarla açılabiliyor.",
      maddeler: ["21:42'de kilitsiz bulundu.", "Kilitte zorlama izi yok.", "İçeriden de dışarıdan da yalnızca anahtarla açılıp kilitlenebiliyor."],
    },
    {
      id: "F3", kod: "F-3", baslik: "Tuvaletteki İzmarit", tur: "fiziksel", kaynak: "Arka oda · tuvalet",
      kisa: "Pervazda taze kül ve izmarit; pencere parmaklıklı.",
      maddeler: ["Pencere pervazında taze sigara külü ve bir izmarit.", "Pencere demir parmaklıklı; parmaklık aralığı 12 cm."],
    },
    {
      id: "F4", kod: "F-4", baslik: "Vitrin Etiketi", tur: "fiziksel", kaynak: "Arka oda",
      kisa: "Harita çerçeveli: 64 × 48 cm.",
      maddeler: ["“Dersaadet Haritası, 1876. Ahşap çerçeveli, 64 × 48 cm.”", "Harita çerçevesiyle birlikte alınmış; boş çerçeve bulunamadı."],
    },
    {
      id: "F5", kod: "F-5", baslik: "Raf Sayımı", tur: "fiziksel", kaynak: "Ön salon",
      kisa: "Defne'nin kitabından 6 adet eksik, satış kaydı yok.",
      maddeler: ["Defne Kara'nın emanet bıraktığı “Kuyu” romanından rafta 6 adet eksik.", "Bu kitaplara ait satış kaydı yok."],
    },
  ],

  supheliler: [
    {
      id: "selin", ad: "Selin Aydın", yas: 23, meslek: "Yarı zamanlı kasiyer, öğrenci",
      iliski: "Bir yıldır dükkânda çalışıyor.",
      giris: [{ who: "selin", text: "Ben bir şey yapmadım. Sadece burada çalışıyorum, tamam mı?" }],
      ifadeler: [
        { id: "selin-1", metin: "Bütün akşam kasadaydım.", bastir: "Yani… neredeyse bütün akşam. Bir ara kahve almaya çıktım." },
        {
          id: "selin-2", metin: "20:15'te karşıdaki kafeye kahve almaya çıktım, on dakikada döndüm.",
          bastir: "Kafenin adını hatırlamıyorum, tamam mı? Herkes her şeyi hatırlamak zorunda mı?",
          yalan: {
            kanitlar: ["K2", "K1"],
            tepki: [
              { who: "selin", text: "…Tamam. Dışarı çıkmadım." },
              { who: "selin", text: "Arka odaya geçtim. Tuvalette, pencerenin önünde sigara içtim. Nevzat Bey kitapların yanında sigarayı yasakladı. Öğrenirse beni kovar." },
              { who: "selin", text: "Ama harita oradaydı, yemin ederim! Dokunmadım bile." },
            ],
            sir: "Selin 20:15–20:27 arası arka odada gizlice sigara içti. Kafe yalanı bunu saklamak içindi.",
          },
        },
        { id: "selin-3", metin: "Vitrinin şifresini bilmiyorum.", bastir: "Bana hiç söylemedi. Gidin ona sorun." },
      ],
    },
    {
      id: "kerem", ad: "Kerem Taşkın", yas: 47, meslek: "Antika koleksiyoncusu",
      iliski: "Geçen ay haritayı almak istedi, reddedildi.",
      giris: [{ who: "kerem", text: "Avukatım gelmeden çok konuşmam ama… sorun bakalım." }],
      ifadeler: [
        { id: "kerem-1", metin: "Haritayı geçen ay 1,8 milyona almak istedim, satmadı.", bastir: "Kırgınım, evet. Koleksiyoncular kırgınlıkla yaşar." },
        {
          id: "kerem-2", metin: "Fotoğrafı kendime çektim, kimseye göndermedim.",
          bastir: "Güzel bir eserdi. Son kez bakmak istedim, o kadar.",
          yalan: {
            kanitlar: ["K3"],
            tepki: [
              { who: "kerem", text: "…Peki. Londra'da bir müşterim var. Haritayı onun adına almaya çalışıyorum." },
              { who: "kerem", text: "Aracılık suç değil. Hırsızlık suç. Ben ikincisini yapmadım." },
            ],
            sir: "Kerem, Londra'daki bir alıcı adına aracılık yapıyor. Haritayı satın almak istiyordu, çalmak değil.",
          },
        },
        { id: "kerem-3", metin: "21:05'te çıktım, gece yarısına kadar meyhanedeydim.", bastir: "Garsona sorun. Masadan kalkmadım bile." },
      ],
    },
    {
      id: "defne", ad: "Defne Kara", yas: 34, meslek: "Yazar",
      iliski: "İmza gününün konuğu; kitaplarını dükkâna emanet bırakıyor.",
      giris: [{ who: "defne", text: "Gecemin böyle biteceğini tahmin etmezdim. Sorun." }],
      ifadeler: [
        { id: "defne-1", metin: "21:20'ye kadar imza verdim, masadan hiç kalkmadım.", bastir: "On iki kişi gördü beni. Bir de kamera." },
        {
          id: "defne-2", metin: "Çıkarken elimdeki paket kendi dosyalarımdı.",
          bastir: "Müsvedde, notlar… Bir yazarın çantasında ne olur sanıyorsunuz?",
          yalan: {
            kanitlar: ["F5"],
            tepki: [
              { who: "defne", text: "…Kitaplarımdı. Kendi kitaplarım. Altı tane." },
              { who: "defne", text: "Nevzat Bey iki aydır satış parasını ödemiyor. Ben de haber vermeden geri aldım. Hırsızlık mı bu? Benim kitaplarım!" },
            ],
            sir: "Defne, dükkâna emanet bıraktığı 6 kitabını haber vermeden geri aldı. Paket buydu.",
          },
        },
        { id: "defne-3", metin: "21:25'te taksiye binip Beşiktaş'a geçtim.", bastir: "Uygulamada kaydı var, bakabilirsiniz." },
      ],
    },
    {
      id: "murat", ad: "Murat Eren", yas: 38, meslek: "Nevzat'ın yeğeni; muhasebe ve stok",
      iliski: "Vitrinin şifresini biliyor, arka kapının anahtarı onda.",
      giris: [{ who: "murat", text: "Amcamın dükkânı soyulmuş, siz beni sorguluyorsunuz. Harika." }],
      ifadeler: [
        { id: "murat-1", metin: "20:40'ta çıktım. Ben çıkarken her şey yerindeydi.", bastir: "Kamerada da görünüyordur zaten. Ön kapıdan, herkesin gözü önünde çıktım." },
        {
          id: "murat-2", metin: "20:50 vapuruyla Üsküdar'a geçtim. 21:15'te evdeydim.",
          bastir: "Vapur, ev, uyku. Heyecanlı bir hayatım yok.",
          yalan: {
            kanitlar: ["K4"],
            tepki: [
              { who: "murat", text: "…" },
              { who: "murat", text: "Tamam, vapuru kaçırdım. Sahilde biraz oturdum. Kafamı dinledim." },
              { who: "murat", text: "Bunun haritayla ne ilgisi var? Ben dükkâna dönmedim!" },
            ],
            sir: "Murat 20:50 vapuruna binmedi; kartı 21:47'de Kadıköy İskelesi'nde okutulmuş. Bir saatten fazla nerede olduğunu kanıtlayamıyor.",
          },
        },
        { id: "murat-3", metin: "Arka kapının anahtarı her zamanki gibi anahtarlığımda.", bastir: "İşte, bakın. Burada. Ne bekliyordunuz?" },
      ],
    },
  ],

  ipuclari: [
    "Haritanın en son ne zaman yerinde görüldüğünü bul. O andan sonra kim neredeydi?",
    "20:53'ten sonra arka odaya ön salondan kimse geçmedi. Hırsız avludan girdiyse arka kapıyı kim açabilirdi?",
    "Sorgu odasında Murat'ın vapur saatine bir ulaşım kaydı göster.",
  ],

  motivasyonlar: [
    { id: "borc", metin: "Borç", aciklama: "Ağır bir borcu kapatmak için paraya ihtiyacı vardı." },
    { id: "tutku", metin: "Tutku", aciklama: "Haritaya ne pahasına olursa olsun sahip olmak istiyordu." },
    { id: "intikam", metin: "İntikam", aciklama: "Nevzat Bey'e duyduğu kırgınlığın hesabını soruyordu." },
    { id: "sir", metin: "Sır", aciklama: "Ortaya çıkmasından korktuğu bir şeyi örtüyordu." },
  ],

  // ======================= ÇÖZÜM =======================
  dogru: { supheli: "murat", kanit: "K4", motivasyon: "borc" },

  finalDogru: {
    id: "final-dogru",
    arkaPlan: "sorgu",
    baslik: "Gerçek",
    satirlar: [
      { who: "halit", text: "Murat Eren. Haritayı sen aldın." },
      { who: "murat", text: "Saçmalık! 20:40'ta çıktım, herkes gördü!" },
      { who: "sen", text: "Çıktın, evet. Herkes görsün diye. Ama vapura binmedin. Kartın 21:47'de Kadıköy'de okutulmuş." },
      { who: "sen", text: "21:12'de yan sokaktan avluya girdin. Arka kapıyı kendi anahtarınla açtın. Vitrinin şifresini zaten biliyordun." },
      { who: "sen", text: "21:31'de battaniyeye sarılı, 64'e 48'lik bir çerçeveyle çıktın. Karşı apartmanın kapı zili seni kaydetti." },
      { who: "murat", text: "…" },
      { who: "murat", text: "Alacaklılar evime geliyordu. Amcam “Kendi pisliğini kendin temizle” dedi. O harita kırk yıldır bir camın arkasında duruyordu… ben batıyordum." },
      { who: "murat", text: "Londra'dan bir alıcı bulmuştum. Pazartesi teslim edecektim. Harita Üsküdar'da, dolabın arkasında." },
      { who: "halit", text: "Acele etmişsin evlat. Arka kapıyı kilitlemeyi unuttun." },
      { who: "anlatici", text: "Sabaha karşı 04:20. Dersaadet Haritası 150 yıllık yolculuğunda bir geceyi daha atlattı." },
    ],
  },
  finalYanlis: {
    id: "final-yanlis",
    arkaPlan: "ofis",
    baslik: "Kaçan Gerçek",
    satirlar: [
      { who: "halit", text: "Savcı dosyayı geri çevirdi. Bu sefer kaçırdık." },
      { who: "halit", text: "Sonra bir şey fark ettim: Murat Eren'in kartı 21:47'de Kadıköy'de okutulmuş. 20:50 vapuruna hiç binmemiş." },
      { who: "halit", text: "Avluya giren kapüşonlu. Şifre. Arka kapının anahtarı. Borç. Hepsi tek bir kişiyi gösteriyordu." },
      { who: "anlatici", text: "Harita, Murat'ın Üsküdar'daki dolabının arkasından çıktı. Ama bu sefer onu bulan sen değildin." },
    ],
  },
  cozum: {
    ozet: "Haritayı Murat Eren çaldı. “20:50 vapuruyla geçtim” dedi ama İstanbulkart'ı Kadıköy'de 21:47'de okutuldu (K-4). Şifreyi bilen ve arka kapının anahtarı olan tek şüpheli oydu; 21:12'de avluya girdi, 21:31'de çerçeveyle çıktı (K-5).",
    eleme: [
      { ad: "Selin Aydın", metin: "Arka odada 12 dakika yalnız kaldı ve kafe konusunda yalan söyledi. Ama harita 20:52'de hâlâ yerindeydi (K-3) ve Selin 20:30'dan sonra kasadan hiç ayrılmadı (K-1). Sırrı: tuvalette gizlice sigara içmek." },
      { ad: "Kerem Taşkın", metin: "Güçlü bir nedeni vardı ve şifreyi görmüş olabilirdi. Ama arka kapının anahtarı yoktu ve 21:10–23:05 arası meyhanedeydi (K-6). Sırrı: Londra'daki bir alıcıya aracılık." },
      { ad: "Defne Kara", metin: "Paketle çıktı ama paket 25 × 18 cm, çerçeve 64 × 48 cm (F-4). 21:26'dan itibaren taksideydi; 21:31'de avluda olamazdı (K-6). Sırrı: kendi kitaplarını haber vermeden geri almak." },
    ],
  },
};
