import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { getCategories } from "@/lib/posts";
import { EMAIL } from "@/lib/site";

const explore = [["Home", "/"], ["Blog", "/blog"], ["Interview Prep", "/interview-prep"], ["FAQ", "/faq"]];
const company = [["Services", "/services"], ["Careers", "/careers"], ["About", "/about"], ["Contact", "/contact"], ["Privacy Policy", "/privacy-policy"]];
const col = "flex flex-col text-sm text-sea/75 md:gap-2.5";
const item = "flex min-h-11 items-center rounded-xl px-3 -mx-3 active:bg-white/10 hover:text-beam md:min-h-0 md:p-0 md:m-0";

export default function Footer() {
  const cats = getCategories();
  return (
    <footer className="relative mt-28 overflow-hidden bg-ink text-sea">
      <svg aria-hidden viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full rotate-180 text-sea"><path d="M0 40 Q300 0 600 30 T1200 20 V60 H0Z" fill="currentColor" /></svg>
      <div aria-hidden className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-beam/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-9 px-6 pb-10 pt-20 md:grid-cols-3 md:pt-24 lg:grid-cols-5">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sea/70">Free interview questions, clear answers and code examples for frontend developers.</p>
          <a href={`mailto:${EMAIL}`} className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition active:scale-[0.98] hover:bg-white/10 sm:inline-flex sm:w-auto"><Mail size={16} /> {EMAIL}</a>
        </div>
        <div><h2 className="mb-4 font-bold">Explore</h2><div className={col}>{explore.map(([l, h]) => <Link key={h} href={h} className={item}>{l}</Link>)}</div></div>
        <div className="order-last col-span-2 md:order-none md:col-span-1"><h2 className="mb-4 font-bold">Topics</h2>
          <div className="flex flex-wrap gap-2 text-sm text-sea/80 md:flex-col md:gap-2.5 md:text-sea/75">{cats.map((c) => <Link key={c.slug} href={`/blog?topic=${c.slug}`} className="rounded-full bg-white/10 px-4 py-2.5 active:bg-white/20 hover:text-beam md:rounded-none md:bg-transparent md:p-0">{c.name}</Link>)}</div></div>
        <div><h2 className="mb-4 font-bold">Company</h2><div className={col}>{company.map(([l, h]) => <Link key={h} href={h} className={item}>{l}</Link>)}</div></div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-xs text-sea/60 sm:flex-row">
          <p>© {new Date().getFullYear()} CodeBeacon. All rights reserved.</p>
          <a href="#" className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-sea active:scale-[0.98] hover:bg-beam hover:text-ink sm:min-h-0 sm:w-auto sm:px-3 sm:py-1.5 sm:text-xs"><ArrowUp size={14} /> Back to top</a>
        </div>
      </div>
    </footer>
  );
}
