import type { Metadata, Viewport } from "next";
import { Courier_Prime, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({ subsets: ["latin", "latin-ext"], weight: ["700", "900"], variable: "--f-serif", display: "swap" });
const mono = Courier_Prime({ subsets: ["latin", "latin-ext"], weight: ["400", "700"], variable: "--f-mono", display: "swap" });
const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--f-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Gizli Dosya · Her gün yeni bir vaka",
  description: "Sinematik bir dedektif oyunu. Olay yerini incele, şüphelileri sorgula, yalanı yakala. Her gece yarısı yeni bir vaka.",
  openGraph: {
    title: "Gizli Dosya · Günün Vakası",
    description: "Gerçeği görebilecek misin?",
    type: "website",
    locale: "tr_TR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
