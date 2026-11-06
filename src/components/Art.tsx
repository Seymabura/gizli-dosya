"use client";

import { useId } from "react";
import type { PortreGorunum, SahneArkaPlan } from "@/game/types";

/* =====================================================================
   PORTRE — noir siluetler (yüzsüz, kenar ışıklı)
   ===================================================================== */
export function Portre({ g, boyut = 160 }: { g: PortreGorunum; boyut?: number }) {
  const uid = useId().replace(/:/g, "");
  const ak = g.aksesuar ?? [];
  const koyu = "#0a0a0c";
  return (
    <svg viewBox="0 0 200 240" width={boyut} height={(boyut * 240) / 200} className="portre" aria-hidden="true">
      <defs>
        <linearGradient id={`rim${uid}`} x1="1" x2="0" y1="0" y2="0.3">
          <stop offset="0" stopColor={g.renk} stopOpacity="0.9" />
          <stop offset="0.25" stopColor={g.renk} stopOpacity="0.15" />
          <stop offset="0.6" stopColor={g.renk} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`hale${uid}`} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor={g.renk} stopOpacity="0.22" />
          <stop offset="1" stopColor={g.renk} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="240" fill={`url(#hale${uid})`} />
      <g stroke={g.renk} strokeOpacity="0.55" strokeWidth="1.2">
        {g.sac === "kapusonlu" && (
          <path d="M44 240 L48 122 C48 58 78 36 100 36 C124 36 154 58 154 122 L158 240 Z" fill="#121216" />
        )}
        {g.sac === "uzun" && (
          <path d="M56 108 C52 56 78 44 100 44 C126 44 150 58 144 108 L152 196 C140 202 130 186 132 150 L128 112 C118 84 82 84 72 112 L68 150 C70 186 60 202 48 196 Z" fill={koyu} />
        )}
        {/* omuzlar */}
        <path d="M14 240 C16 192 58 168 100 168 C142 168 184 192 186 240 Z" fill={koyu} />
        <rect x="84" y="140" width="32" height="34" fill={koyu} stroke="none" />
        {/* baş */}
        <ellipse cx="100" cy="106" rx="39" ry="47" fill={koyu} />
        {g.sac === "kisa" && <path d="M60 102 C56 60 80 50 100 50 C126 50 146 62 140 102 C132 80 120 72 100 72 C80 72 68 80 60 102 Z" fill={koyu} />}
        {g.sac === "geriye" && <path d="M62 94 C62 62 82 52 100 52 C122 52 140 62 138 94 C126 76 112 68 100 68 C86 68 72 76 62 94 Z" fill={koyu} />}
        {g.sac === "kakul" && <path d="M54 136 C50 62 78 48 100 48 C126 48 152 62 146 136 L132 136 L134 98 C118 88 82 88 66 98 L68 136 Z" fill={koyu} />}
        {g.sac === "kel" && <path d="M78 66 C88 60 108 60 118 64" fill="none" strokeOpacity="0.35" />}
      </g>
      {/* kenar ışığı */}
      <path d="M14 240 C16 192 58 168 100 168 C142 168 184 192 186 240 Z" fill={`url(#rim${uid})`} />
      <ellipse cx="100" cy="106" rx="39" ry="47" fill={`url(#rim${uid})`} />
      {/* gözler */}
      <ellipse cx="86" cy="108" rx="4" ry="1.6" fill={g.renk} opacity="0.5" />
      <ellipse cx="114" cy="108" rx="4" ry="1.6" fill={g.renk} opacity="0.5" />
      {/* aksesuarlar */}
      {ak.includes("gozluk") && (
        <g fill="none" stroke={g.renk} strokeWidth="1.6" opacity="0.8">
          <rect x="72" y="100" width="22" height="14" rx="2" /><rect x="106" y="100" width="22" height="14" rx="2" /><path d="M94 106 L106 106" />
        </g>
      )}
      {ak.includes("yuvarlakGozluk") && (
        <g fill="none" stroke={g.renk} strokeWidth="1.6" opacity="0.8">
          <circle cx="85" cy="107" r="10" /><circle cx="115" cy="107" r="10" /><path d="M95 106 L105 106" />
        </g>
      )}
      {ak.includes("biyik") && <path d="M80 130 C90 122 110 122 120 130 C110 134 90 134 80 130 Z" fill="#000" stroke={g.renk} strokeOpacity="0.4" />}
      {ak.includes("kupe") && (
        <g fill={g.renk}><circle cx="61" cy="128" r="3" /><circle cx="139" cy="128" r="3" /></g>
      )}
      {ak.includes("fular") && <path d="M80 168 L100 196 L120 168 Z" fill={g.renk} opacity="0.55" />}
      {ak.includes("fotr") && (
        <g fill="#060607" stroke={g.renk} strokeOpacity="0.6" strokeWidth="1.2">
          <path d="M64 72 C64 40 76 28 100 28 C124 28 136 40 136 72 Z" />
          <rect x="64" y="62" width="72" height="8" fill={g.renk} fillOpacity="0.25" stroke="none" />
          <ellipse cx="100" cy="74" rx="72" ry="11" />
        </g>
      )}
    </svg>
  );
}

/* =====================================================================
   HİKÂYE ARKA PLANLARI
   ===================================================================== */
export function SahneArka({ tur }: { tur: SahneArkaPlan }) {
  return (
    <svg className="sahne-arka" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="gok" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#05070b" /><stop offset="1" stopColor="#141a24" />
        </linearGradient>
        <radialGradient id="lamba" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#f3d27a" stopOpacity="0.55" /><stop offset="1" stopColor="#f3d27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="islak" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1a2230" /><stop offset="1" stopColor="#07090c" />
        </linearGradient>
        <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {tur === "sokak" && (
        <g>
          <rect width="1000" height="600" fill="url(#gok)" />
          {[[0, 120, 160, 360], [150, 60, 180, 420], [720, 90, 140, 390], [850, 40, 160, 440]].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill="#0b0e13" />
              {Array.from({ length: 6 }).map((_, j) => (
                <rect key={j} x={x + 20 + (j % 3) * 45} y={y + 30 + Math.floor(j / 3) * 70} width="22" height="34"
                  fill={(i + j) % 4 === 0 ? "#c9a24a" : "#141a22"} opacity={(i + j) % 4 === 0 ? 0.45 : 1} />
              ))}
            </g>
          ))}
          <rect x="330" y="150" width="380" height="330" fill="#100d0b" />
          <rect x="370" y="250" width="300" height="230" fill="#2a1c0f" />
          <rect x="370" y="250" width="300" height="230" fill="url(#lamba)" />
          {Array.from({ length: 5 }).map((_, i) => <rect key={i} x={385 + i * 58} y="270" width="40" height="190" fill="#1a120a" opacity="0.8" />)}
          <text x="500" y="215" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" fontWeight="700" fill="#ffd27a" filter="url(#neon)" letterSpacing="4">ESKİ HARF</text>
          <rect x="0" y="480" width="1000" height="120" fill="url(#islak)" />
          <rect x="370" y="490" width="300" height="80" fill="#c9a24a" opacity="0.08" />
          <g>
            <rect x="802" y="150" width="6" height="330" fill="#070809" />
            <path d="M790 150 L820 150 L812 140 L798 140 Z" fill="#070809" />
            <path d="M805 152 L700 480 L910 480 Z" fill="#f3d27a" opacity="0.06" />
          </g>
          <path d="M120 600 C200 560 260 590 320 560" stroke="#3a4a60" strokeOpacity="0.4" fill="none" />
        </g>
      )}

      {tur === "dukkan" && (
        <g>
          <rect width="1000" height="600" fill="#0d0a08" />
          <rect x="0" y="0" width="1000" height="600" fill="url(#lamba)" opacity="0.6" />
          {Array.from({ length: 6 }).map((_, r) => (
            <g key={r}>
              <rect x="0" y={60 + r * 80} width="260" height="6" fill="#1d150d" />
              <rect x="740" y={60 + r * 80} width="260" height="6" fill="#1d150d" />
              {Array.from({ length: 12 }).map((_, k) => (
                <g key={k}>
                  <rect x={8 + k * 20} y={14 + r * 80} width={14} height={46} fill={["#2a1b12", "#1e2a2a", "#3a1414", "#1f1a12"][(r + k) % 4]} />
                  <rect x={748 + k * 20} y={14 + r * 80} width={14} height={46} fill={["#1f1a12", "#2a1b12", "#1e2a2a", "#3a1414"][(r + k) % 4]} />
                </g>
              ))}
            </g>
          ))}
          <rect x="330" y="420" width="340" height="180" fill="#120c08" />
          <rect x="330" y="420" width="340" height="10" fill="#2a1d12" />
        </g>
      )}

      {tur === "ofis" && (
        <g>
          <rect width="1000" height="600" fill="#08090b" />
          <rect x="560" y="60" width="360" height="300" fill="#141820" />
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="560" y={66 + i * 25} width="360" height="12" fill="#d8dde6" opacity="0.13" />
          ))}
          <path d="M560 360 L180 600 L760 600 L920 360 Z" fill="#d8dde6" opacity="0.04" />
          <rect x="80" y="430" width="560" height="20" fill="#16120e" />
          <rect x="100" y="450" width="20" height="150" fill="#100c09" />
          <rect x="600" y="450" width="20" height="150" fill="#100c09" />
          <path d="M210 330 L250 330 L280 420 L180 420 Z" fill="#f3d27a" opacity="0.1" />
          <rect x="226" y="300" width="8" height="34" fill="#222" />
          <ellipse cx="230" cy="300" rx="26" ry="10" fill="#1d1d1d" />
          <rect x="400" y="405" width="26" height="26" fill="#1b1b1b" /><rect x="440" y="410" width="22" height="21" fill="#1b1b1b" />
        </g>
      )}

      {tur === "sorgu" && (
        <g>
          <rect width="1000" height="600" fill="#060708" />
          <rect x="620" y="80" width="300" height="200" fill="#11151a" stroke="#1f252d" strokeWidth="6" />
          <rect x="620" y="80" width="300" height="200" fill="#9fb3c8" opacity="0.04" />
          <line x1="500" y1="0" x2="500" y2="120" stroke="#222" strokeWidth="2" />
          <path d="M470 120 L530 120 L515 104 L485 104 Z" fill="#1a1a1a" />
          <path d="M478 122 L250 520 L750 520 L522 122 Z" fill="#f3d27a" opacity="0.08" />
          <ellipse cx="500" cy="520" rx="260" ry="34" fill="#f3d27a" opacity="0.06" />
          <rect x="300" y="470" width="400" height="18" fill="#17130f" />
          <rect x="320" y="488" width="14" height="112" fill="#0f0c0a" /><rect x="666" y="488" width="14" height="112" fill="#0f0c0a" />
        </g>
      )}
    </svg>
  );
}

/* =====================================================================
   OLAY YERİ ODALARI (1000 × 620)
   ===================================================================== */
export function OdaCizim({ oda }: { oda: string }) {
  return (
    <svg className="oda-cizim" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <radialGradient id="oLamba" cx="0.5" cy="0.15" r="0.8">
          <stop offset="0" stopColor="#f0c86a" stopOpacity="0.32" /><stop offset="1" stopColor="#f0c86a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="zemin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1a130c" /><stop offset="1" stopColor="#080605" />
        </linearGradient>
        <linearGradient id="cam" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#9fb3c8" stopOpacity="0.16" /><stop offset="0.5" stopColor="#9fb3c8" stopOpacity="0.04" /><stop offset="1" stopColor="#9fb3c8" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="gece" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#060a12" /><stop offset="1" stopColor="#172131" />
        </linearGradient>
      </defs>

      {oda === "on" && (
        <g>
          <rect width="1000" height="430" fill="#120d09" />
          <rect y="430" width="1000" height="190" fill="url(#zemin)" />
          {/* ön kapı / vitrin camı, dışarıda yağmurlu sokak */}
          <rect x="370" y="95" width="260" height="300" fill="url(#gece)" />
          <rect x="370" y="95" width="260" height="300" fill="url(#cam)" />
          <line x1="500" y1="95" x2="500" y2="395" stroke="#2a1d12" strokeWidth="6" />
          <rect x="370" y="95" width="260" height="300" fill="none" stroke="#2a1d12" strokeWidth="10" />
          <text x="500" y="150" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fill="#d4af37" opacity="0.5" transform="scale(-1,1) translate(-1000,0)">ESKİ HARF</text>
          {/* ön kapı kamerası */}
          <rect x="482" y="60" width="36" height="18" rx="3" fill="#1d1d1d" stroke="#333" />
          <circle cx="500" cy="69" r="4" fill="#b01a1a" />
          {/* sol raf */}
          <rect x="40" y="70" width="230" height="360" fill="#1b130b" />
          {Array.from({ length: 5 }).map((_, r) => (
            <g key={r}>
              <rect x="40" y={130 + r * 62} width="230" height="6" fill="#2c1f12" />
              {Array.from({ length: 11 }).map((_, k) =>
                r === 2 && k > 5 ? null : (
                  <rect key={k} x={48 + k * 20} y={88 + r * 62} width="15" height={40 + ((k * 7) % 3) * 2}
                    fill={["#3b2416", "#23302e", "#4a1a1a", "#2e2616", "#1d2433"][(r + k) % 5]} />
                ),
              )}
            </g>
          ))}
          <text x="205" y="258" fontFamily="Courier New, monospace" fontSize="13" fill="#d4af37" opacity="0.7">KUYU</text>
          {/* sağ: kasa ve iç kapı */}
          <rect x="690" y="120" width="120" height="310" fill="#0a0806" stroke="#2a1d12" strokeWidth="6" />
          <text x="750" y="110" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="13" fill="#8a8f98">ARKA ODA</text>
          <rect x="740" y="370" width="220" height="70" fill="#22180f" />
          <rect x="740" y="370" width="220" height="8" fill="#3a2a18" />
          <rect x="860" y="340" width="60" height="30" fill="#151515" />
          <text x="850" y="415" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="13" fill="#8a7a5a">KASA</text>
          {/* kasa kamerası */}
          <path d="M930 60 L960 60 L960 80 L938 92 Z" fill="#1d1d1d" stroke="#333" />
          <circle cx="934" cy="86" r="4" fill="#b01a1a" />
          {/* imza masası */}
          <rect x="320" y="420" width="360" height="22" fill="#2a1d12" />
          <rect x="340" y="442" width="12" height="110" fill="#1a120a" /><rect x="648" y="442" width="12" height="110" fill="#1a120a" />
          {Array.from({ length: 4 }).map((_, i) => <rect key={i} x={360 + i * 14} y={396 - i * 3} width="60" height="10" fill={["#4a1a1a", "#3b2416", "#4a1a1a", "#3b2416"][i]} transform={`rotate(${i * 2 - 3} 390 400)`} />)}
          {[580, 605, 630].map((x) => <path key={x} d={`M${x} 420 L${x - 7} 395 L${x + 13} 395 L${x + 6} 420 Z`} fill="#d8cdb4" opacity="0.85" />)}
          <rect width="1000" height="620" fill="url(#oLamba)" />
        </g>
      )}

      {oda === "arka" && (
        <g>
          <rect width="1000" height="440" fill="#0e0b09" />
          <rect y="440" width="1000" height="180" fill="url(#zemin)" />
          {/* tuvalet kapısı ve penceresi */}
          <rect x="60" y="120" width="170" height="340" fill="#16110c" stroke="#2a1d12" strokeWidth="6" />
          <rect x="95" y="170" width="90" height="80" fill="url(#gece)" />
          {[110, 125, 140, 155, 170].map((x) => <line key={x} x1={x} y1="170" x2={x} y2="250" stroke="#3a3a3a" strokeWidth="3" />)}
          <rect x="92" y="250" width="96" height="8" fill="#2a2a2a" />
          <circle cx="160" cy="254" r="3" fill="#bbb" opacity="0.6" />
          <text x="145" y="300" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="14" fill="#8a8f98">WC</text>
          {/* vitrin */}
          <rect x="360" y="190" width="280" height="230" fill="#0a0a0c" stroke="#3a2a18" strokeWidth="8" />
          <rect x="360" y="190" width="280" height="230" fill="url(#cam)" />
          <rect x="420" y="225" width="160" height="120" fill="none" stroke="#d4af37" strokeOpacity="0.35" strokeDasharray="6 6" strokeWidth="2" />
          <text x="500" y="292" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="14" fill="#d4af37" opacity="0.55">boş</text>
          <rect x="380" y="420" width="240" height="40" fill="#22180f" />
          <rect x="600" y="390" width="26" height="22" rx="3" fill="#2b2b2b" stroke="#555" />
          {/* etiket */}
          <rect x="680" y="230" width="72" height="34" fill="#b08d3a" opacity="0.85" />
          <line x1="688" y1="242" x2="744" y2="242" stroke="#3a2a10" strokeWidth="2" /><line x1="688" y1="252" x2="730" y2="252" stroke="#3a2a10" strokeWidth="2" />
          {/* arka çelik kapı */}
          <rect x="800" y="110" width="150" height="350" fill="#1c1f23" stroke="#2f343a" strokeWidth="6" />
          {[150, 250, 350].map((y) => <line key={y} x1="806" y1={y} x2="944" y2={y} stroke="#2a2e33" strokeWidth="3" />)}
          <rect x="818" y="285" width="16" height="30" fill="#8a8f98" />
          <circle cx="826" cy="306" r="3" fill="#111" />
          <rect x="950" y="110" width="50" height="350" fill="url(#gece)" opacity="0.8" />
          {/* koliler */}
          <rect x="240" y="480" width="110" height="80" fill="#4a3620" /><rect x="260" y="440" width="80" height="44" fill="#5a4228" />
          <text x="300" y="525" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="12" fill="#1a1208">MURAT</text>
          <rect width="1000" height="620" fill="url(#oLamba)" opacity="0.8" />
        </g>
      )}

      {oda === "avlu" && (
        <g>
          <rect width="1000" height="620" fill="url(#gece)" />
          <rect y="410" width="1000" height="210" fill="#0b0d10" />
          <ellipse cx="480" cy="540" rx="280" ry="40" fill="#1a2433" opacity="0.6" />
          {/* dükkânın arka duvarı ve kapı */}
          <rect x="0" y="80" width="200" height="340" fill="#0e0f12" />
          <rect x="40" y="160" width="120" height="250" fill="#1c1f23" stroke="#2f343a" strokeWidth="5" />
          <rect x="54" y="275" width="10" height="22" fill="#8a8f98" />
          {/* saksılar */}
          {[220, 270, 320].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 410 L${x + 36} 410 L${x + 30} 380 L${x + 6} 380 Z`} fill="#3a2418" />
              <path d={`M${x + 18} 380 C${x - 6} 340 ${x + 6} 330 ${x + 18} 300 C${x + 30} 330 ${x + 42} 340 ${x + 18} 380`} fill="#14261a" opacity={0.8 - i * 0.1} />
            </g>
          ))}
          {/* ayak izleri */}
          {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={360 + i * 32} cy={530 + (i % 2) * 14} rx="9" ry="5" fill="#05070a" opacity="0.7" />)}
          {/* duvar ve bahçe kapısı */}
          <rect x="560" y="200" width="160" height="220" fill="#101317" />
          <rect x="720" y="210" width="110" height="210" fill="none" stroke="#3a3f47" strokeWidth="5" />
          {[740, 760, 780, 800].map((x) => <line key={x} x1={x} y1="214" x2={x} y2="416" stroke="#3a3f47" strokeWidth="3" />)}
          <rect x="804" y="300" width="22" height="8" fill="#6a6f78" />
          {/* karşı apartman */}
          <rect x="860" y="120" width="140" height="300" fill="#0c0e12" />
          <rect x="895" y="250" width="70" height="170" fill="#1a1612" />
          <rect x="925" y="295" width="20" height="26" rx="3" fill="#2b2b2b" stroke="#555" />
          <circle cx="935" cy="303" r="3.5" fill="#e04848" />
          <text x="930" y="240" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="12" fill="#8a8f98">No:7</text>
          <text x="790" y="190" textAnchor="middle" fontFamily="Courier New, monospace" fontSize="12" fill="#5a6070">LEYLAK SK. →</text>
        </g>
      )}
    </svg>
  );
}
