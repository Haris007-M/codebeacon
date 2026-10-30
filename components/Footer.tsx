import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { getCategories } from "@/lib/posts";
import { EMAIL } from "@/lib/site";

const explore = [["Home", "/"], ["Blog", "/blog"], ["Interview Prep", "/interview-prep"], ["FAQ", "/faq"]];
const company = [["Services", "/services"], ["Careers", "/careers"], ["About", "/about"], ["Contact", "/contact"], ["Privacy Policy", "/privacy-policy"]];
const col = "flex flex-col gap-2.5 text-sm text-sea/75";

export default function Footer() {
  const cats = getCategories();
  return (
    <footer className="relative mt-28 overflow-hidden bg-ink text-sea">
      <svg aria-hidden viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full rotate-180 text-sea"><path d="M0 40 Q300 0 600 30 T1200 20 V60 H0Z" fill="currentColor" /></svg>
      <div aria-hidden className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-beam/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-24 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sea/70">Free interview questions, clear answers and code examples for frontend developers.</p>
          <a href={`mailto:${EMAIL}`} className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white/10"><Mail size={16} /> {EMAIL}</a>
        </div>
        <div><h2 className="mb-4 font-bold">Explore</h2><div className={col}>{explore.map(([l, h]) => <Link key={h} href={h} className="hover:text-beam">{l}</Link>)}</div></div>
        <div><h2 className="mb-4 font-bold">Topics</h2><div className={col}>{cats.map((c) => <Link key={c.slug} href={`/blog?topic=${c.slug}`} className="hover:text-beam">{c.name}</Link>)}</div></div>
        <div><h2 className="mb-4 font-bold">Company</h2><div className={col}>{company.map(([l, h]) => <Link key={h} href={h} className="hover:text-beam">{l}</Link>)}</div></div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-sea/60 sm:flex-row">
          <p>© {new Date().getFullYear()} CodeBeacon. All rights reserved.</p>
          <a href="#" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-medium text-sea hover:bg-beam hover:text-ink"><ArrowUp size={14} /> Back to top</a>
        </div>
      </div>
    </footer>
  );
}
