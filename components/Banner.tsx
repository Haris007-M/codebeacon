import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export default function Banner({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <div className="relative my-12 overflow-hidden rounded-3xl bg-gradient-to-r from-ink via-[#0d3a4f] to-teal p-8 text-sea md:p-10">
      <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-beam/25 blur-3xl" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <span className="hidden sm:block"><LogoMark size={48} /></span>
          <div>
            <h3 className="text-2xl font-extrabold md:text-3xl">{title}</h3>
            <p className="mt-2 max-w-xl text-sea/80">{text}</p>
          </div>
        </div>
        <Link href={href} className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-beam px-6 py-3 font-semibold text-ink transition hover:bg-white md:self-auto">
          {cta} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
