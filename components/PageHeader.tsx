import Image from "next/image";

export default function PageHeader({ title, intro, art = "frontend" }: { title: string; intro: string; art?: string }) {
  return (
    <div className="relative overflow-hidden bg-ink text-sea">
      <Image src={`/images/banners/${art}.webp`} alt="" fill priority sizes="100vw" className="object-cover object-right" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#050d18] via-[#050d18]/75 to-transparent md:via-[#050d18]/40" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-beam/60 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-beam backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-beam" /> CodeBeacon
        </span>
        <h1 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight drop-shadow-sm sm:text-4xl md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-xl text-base text-sea/80 md:text-lg">{intro}</p>
      </div>
    </div>
  );
}
