"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, BookOpen } from "lucide-react";

const stars = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 58,
  size: 1 + (i % 3),
  delay: (i % 7) * 0.45,
}));

const code = [
  { n: 21, html: '<span class="text-pink-300">function</span> <span class="text-sky-300">answer</span>(q) {' },
  { n: 30, html: '  <span class="text-pink-300">return</span> <span class="text-emerald-300">"clear and concise"</span>;' },
  { n: 1, html: "}" },
  { n: 22, html: '<span class="text-slate-400">// interview ready</span>' },
];

function Scene() {
  return (
    <div className="relative h-[430px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#050d18] via-[#0a2036] to-[#12405a] shadow-2xl md:h-[520px]" aria-hidden>
      {stars.map((s, i) => (
        <span key={i} className="star absolute rounded-full bg-white" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
      ))}
      <div className="absolute left-8 top-8 h-14 w-14 rounded-full bg-[#fdf6d8] shadow-[0_0_60px_18px_rgba(253,246,216,0.35)]" />

      <svg viewBox="0 0 200 400" className="absolute bottom-10 right-6 h-[78%] overflow-visible" style={{ transformOrigin: "bottom" }}>
        <defs>
          <linearGradient id="bm" x1="0" x2="1">
            <stop offset="0" stopColor="#FFB020" stopOpacity="0.75" />
            <stop offset="1" stopColor="#FFB020" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="beam-sweep">
          <polygon points="100,92 -520,20 -520,160" fill="url(#bm)" />
        </g>
        <polygon points="70,380 130,380 118,120 82,120" fill="#e9eef2" />
        <polygon points="76,330 124,330 121,300 79,300" fill="#d94b4b" />
        <polygon points="82,250 118,250 116,222 84,222" fill="#d94b4b" />
        <polygon points="86,180 114,180 113,152 87,152" fill="#d94b4b" />
        <rect x="72" y="112" width="56" height="8" fill="#1d2b3a" />
        <rect x="84" y="82" width="32" height="30" fill="#FFB020" className="lamp" />
        <polygon points="80,82 120,82 100,62" fill="#1d2b3a" />
        <rect x="55" y="378" width="90" height="12" rx="3" fill="#1d2b3a" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-16 overflow-hidden">
        <div className="wave absolute bottom-0 w-[200%] opacity-60" style={{ animationDuration: "14s" }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-16 w-full"><path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill="#0c3550" /></svg>
        </div>
        <div className="wave absolute -bottom-2 w-[200%]" style={{ animationDuration: "9s", animationDirection: "reverse" }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-14 w-full"><path d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30 V60 H0Z" fill="#071a2b" /></svg>
        </div>
      </div>

      <div className="float-card absolute bottom-20 left-4 w-[82%] max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#0b1626]/90 shadow-xl backdrop-blur md:left-6">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" /><span className="h-2.5 w-2.5 rounded-full bg-yellow-400" /><span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-slate-400">answer.ts</span>
        </div>
        <div className="space-y-1 p-4 font-mono text-[13px] text-slate-100">
          {code.map((l, i) => (
            <div key={i} className="type" style={{ ["--n" as string]: l.n, animationDelay: `${1.2 + i * 1.3}s`, animationDuration: `${Math.max(0.5, l.n * 0.045)}s` }} dangerouslySetInnerHTML={{ __html: l.html }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-in", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", clearProps: "opacity,transform" });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-gradient-to-br from-[#050d18] to-ink text-sea">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <h1 className="hero-in text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Interview answers that <span className="text-beam">light the way.</span>
          </h1>
          <p className="hero-in mt-6 max-w-lg text-lg text-sea/80">
            Real questions, clear explanations and the latest changes in React, Next.js, Tailwind CSS, GSAP, Git and frontend development.
          </p>
          <div className="hero-in mt-9 flex flex-wrap gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full bg-beam px-6 py-3 font-semibold text-ink transition hover:bg-white">
              Read the blog <ArrowRight size={18} />
            </Link>
            <Link href="/interview-prep" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10">
              <BookOpen size={18} /> Start preparing
            </Link>
          </div>
        </div>
        <div className="hero-in"><Scene /></div>
      </div>
    </section>
  );
}
