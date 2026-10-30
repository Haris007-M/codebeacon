import type { ReactNode } from "react";

const S = { fill: "none", stroke: "#fff", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const M = { fill: "#fff", fontFamily: "ui-monospace, monospace", fontWeight: 700 } as const;
const A = "#FFB020";
const D = "#0B1F33";

const chips = [{ t: "p-4", x: 170, y: 48 }, { t: "flex", x: 245, y: 48 }, { t: "rounded-xl", x: 170, y: 92 }, { t: "text-lg", x: 285, y: 92 }, { t: "bg-teal", x: 200, y: 136 }];

const art: Record<string, ReactNode> = {
  gsap: (<g>
    <path d="M160 40V160M220 40V160M280 40V160M340 40V160" {...S} opacity=".3" />
    <rect x="160" y="55" width="130" height="16" rx="8" fill={A} />
    <rect x="215" y="90" width="150" height="16" rx="8" fill="#fff" opacity=".75" />
    <rect x="185" y="125" width="100" height="16" rx="8" fill="#fff" opacity=".45" />
    <path d="M262 38V158" stroke={A} strokeWidth="3" /><circle cx="262" cy="38" r="7" fill={A} />
    <path d="M300 160C320 160 330 135 372 130" {...S} strokeDasharray="2 7" />
  </g>),
  react: (<g>
    <g {...S}><ellipse cx="270" cy="100" rx="75" ry="28" /><ellipse cx="270" cy="100" rx="75" ry="28" transform="rotate(60 270 100)" /><ellipse cx="270" cy="100" rx="75" ry="28" transform="rotate(120 270 100)" /></g>
    <circle cx="270" cy="100" r="11" fill={A} /><circle cx="345" cy="100" r="5" fill="#fff" /><circle cx="307" cy="165" r="5" fill="#fff" /><circle cx="232" cy="35" r="5" fill="#fff" />
  </g>),
  nextjs: (<g>
    <rect x="165" y="35" width="210" height="130" rx="14" {...S} /><path d="M165 62H375" {...S} />
    <circle cx="182" cy="48" r="3.5" fill="#fff" /><circle cx="195" cy="48" r="3.5" fill="#fff" /><circle cx="208" cy="48" r="3.5" fill="#fff" />
    <g {...M} fontSize="14"><text x="185" y="88">app/</text><text x="205" y="110">layout.tsx</text><text x="205" y="132">page.tsx</text><text x="205" y="154">blog/</text></g>
    <rect x="316" y="94" width="46" height="22" rx="11" fill={A} /><text x="339" y="109" textAnchor="middle" fontSize="11" fontWeight="700" fill={D} fontFamily="ui-monospace,monospace">SSR</text>
  </g>),
  typescript: (<g>
    <text x="185" y="132" fontSize="86" fontWeight="800" fill="#fff" fontFamily="ui-monospace,monospace">&lt;T&gt;</text>
    <rect x="250" y="38" width="112" height="28" rx="14" fill={A} /><text x="306" y="57" textAnchor="middle" fontSize="14" fontWeight="700" fill={D} fontFamily="ui-monospace,monospace">: string</text>
    <path d="M190 156H370" {...S} strokeDasharray="3 8" />
  </g>),
  tailwind: (<g>
    {chips.map((c) => (<g key={c.t}><rect x={c.x} y={c.y} width={c.t.length * 9 + 24} height="30" rx="15" fill="#fff" fillOpacity=".16" stroke="#fff" strokeWidth="1.8" /><text x={c.x + 12} y={c.y + 20} fontSize="13" {...M}>{c.t}</text></g>))}
    <circle cx="330" cy="150" r="15" fill={A} /><circle cx="362" cy="150" r="15" fill="#fff" opacity=".85" /><circle cx="346" cy="122" r="15" fill="#fff" opacity=".4" />
  </g>),
  framer: (<g>
    <path d="M160 150C190 150 200 45 235 45S265 135 295 105 340 88 380 95" {...S} strokeWidth="3" /><circle cx="235" cy="45" r="5" fill={A} />
    <rect x="270" y="125" width="64" height="40" rx="12" fill="#fff" opacity=".2" /><rect x="288" y="132" width="64" height="40" rx="12" fill="#fff" opacity=".45" /><rect x="306" y="139" width="64" height="40" rx="12" fill={A} />
  </g>),
  git: (<g>
    <path d="M170 70H375" {...S} /><path d="M225 70C240 70 245 130 275 130H330C358 130 362 70 375 70" {...S} />
    {[170, 225, 290, 375].map((x) => <circle key={x} cx={x} cy="70" r="8" fill={D} stroke="#fff" strokeWidth="3" />)}
    <circle cx="275" cy="130" r="8" fill={A} /><circle cx="330" cy="130" r="8" fill={A} />
  </g>),
  javascript: (<g>
    <text x="170" y="132" fontSize="94" fontWeight="800" fill="#fff" fontFamily="ui-monospace,monospace">{"{ }"}</text>
    <circle cx="335" cy="95" r="38" {...S} strokeDasharray="7 6" /><circle cx="335" cy="57" r="7" fill={A} /><circle cx="335" cy="95" r="14" fill="#fff" opacity=".3" />
  </g>),
  frontend: (<g>
    <rect x="165" y="35" width="210" height="130" rx="14" {...S} /><path d="M165 62H375M215 62V165" {...S} opacity=".6" />
    <rect x="228" y="76" width="60" height="30" rx="6" fill={A} /><rect x="298" y="76" width="60" height="30" rx="6" fill="#fff" opacity=".4" /><rect x="228" y="118" width="130" height="30" rx="6" fill="#fff" opacity=".25" />
    <rect x="178" y="76" width="26" height="8" rx="4" fill="#fff" opacity=".7" /><rect x="178" y="94" width="26" height="8" rx="4" fill="#fff" opacity=".4" />
  </g>),
  blog: (<g>
    <rect x="235" y="40" width="130" height="112" rx="12" fill="#fff" fillOpacity=".12" stroke="#fff" strokeWidth="2" transform="rotate(8 300 95)" />
    <rect x="205" y="45" width="130" height="115" rx="12" fill={D} fillOpacity=".55" stroke="#fff" strokeWidth="2.5" />
    <path d="M222 75H300M222 95H318M222 115H290" {...S} /><rect x="222" y="132" width="42" height="14" rx="7" fill={A} />
  </g>),
  topics: (<g>
    <path d="M270 100L200 55M270 100L345 60M270 100L350 140M270 100L195 145M270 100L270 35" {...S} opacity=".7" />
    <circle cx="270" cy="100" r="22" fill={A} />
    {[[200, 55], [345, 60], [350, 140], [195, 145], [270, 35]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="12" fill={D} stroke="#fff" strokeWidth="3" />)}
  </g>),
  prep: (<g>
    {[50, 92, 134].map((y, i) => (<g key={y}>
      <rect x="185" y={y} width="28" height="28" rx="8" {...S} />
      {i < 2 && <path d={`M191 ${y + 14}l6 6 11-12`} {...S} stroke={A} strokeWidth="3.5" />}
      <path d={`M232 ${y + 14}H${350 - i * 35}`} {...S} opacity=".7" />
    </g>))}
  </g>),
  faq: (<g>
    <path d="M185 40H325a14 14 0 0 1 14 14V102a14 14 0 0 1-14 14H255l-26 24V116H185a14 14 0 0 1-14-14V54a14 14 0 0 1 14-14Z" {...S} />
    <text x="255" y="94" textAnchor="middle" fontSize="52" fontWeight="800" fill={A}>?</text>
    <circle cx="358" cy="150" r="22" fill="#fff" opacity=".2" /><text x="358" y="160" textAnchor="middle" fontSize="28" fontWeight="800" fill="#fff">?</text>
  </g>),
  about: (<g>
    <path d="M250 168L258 82H282L290 168Z" fill="#fff" opacity=".9" /><rect x="255" y="56" width="30" height="26" fill={A} /><path d="M250 56L270 34L290 56Z" fill="#fff" />
    <path d="M288 69L392 36M288 69L392 102" stroke={A} strokeWidth="2.5" opacity=".6" /><path d="M165 170H392" {...S} />
  </g>),
  contact: (<g>
    <rect x="190" y="55" width="170" height="110" rx="14" {...S} /><path d="M192 60L275 120 358 60" {...S} /><circle cx="356" cy="55" r="14" fill={A} />
  </g>),
  privacy: (<g>
    <path d="M275 35L350 62V108C350 142 312 162 275 172 238 162 200 142 200 108V62Z" {...S} />
    <rect x="253" y="97" width="44" height="34" rx="7" fill={A} /><path d="M261 97V86a14 14 0 0 1 28 0V97" {...S} />
  </g>),
};

export const artKey = (category: string) =>
  ({ React: "react", "Next.js": "nextjs", TypeScript: "typescript", "Tailwind CSS": "tailwind", GSAP: "gsap", "Framer Motion": "framer", Git: "git", JavaScript: "javascript" } as Record<string, string>)[category] ?? "frontend";

export default function Art({ name, className = "" }: { name: string; className?: string }) {
  return <svg viewBox="0 0 400 200" preserveAspectRatio="xMaxYMid slice" className={className} aria-hidden>{art[name] ?? art.frontend}</svg>;
}
