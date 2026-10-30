"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

// Desktop order: learning first, then company. Contact is the call-to-action button.
const groups = [
  { title: "Learn", links: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/interview-prep", label: "Interview Prep" },
    { href: "/faq", label: "FAQ" },
  ] },
  { title: "Company", links: [
    { href: "/services", label: "Services" },
    { href: "/careers", label: "Careers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ] },
];
const desktop = ["/", "/blog", "/interview-prep", "/services", "/careers", "/about", "/faq"]
  .map((h) => groups.flatMap((g) => g.links).find((l) => l.href === h)!);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  const bar = "absolute left-1/2 top-1/2 -ml-3 -mt-px h-0.5 w-6 rounded-full bg-current transition-all duration-300";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink/95 shadow-[0_8px_30px_-12px_rgba(11,31,51,0.7)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink/85">
        <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 text-sea sm:px-6" aria-label="Main">
          <span aria-hidden className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(60%_120%_at_85%_0%,rgba(15,118,110,0.35),transparent_70%),radial-gradient(40%_100%_at_0%_100%,rgba(255,176,32,0.12),transparent_70%)]" />
          <Link href="/" aria-label="CodeBeacon home" className="relative"><Logo light /></Link>
          <div className="relative hidden items-center gap-0.5 text-sm font-medium lg:flex xl:gap-1">
            {desktop.map((l) => (
              <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} className={`whitespace-nowrap rounded-full px-3 py-2 transition-colors ${active(l.href) ? "bg-white/10 text-beam" : "text-sea/80 hover:bg-white/5 hover:text-white"}`}>{l.label}</Link>
            ))}
          </div>
          <div className="relative flex items-center gap-2">
            <Link href="/contact" className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal/30 transition hover:brightness-110 active:scale-95 lg:inline-block ${active("/contact") ? "bg-beam !text-ink" : "bg-teal"}`}>Contact</Link>
            <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"
              className={`relative h-11 w-11 rounded-full text-sea transition-colors lg:hidden ${open ? "bg-white/15" : "bg-white/10"}`}>
              <span className={bar} style={{ transform: open ? "translateY(0) rotate(45deg)" : "translateY(-7px)" }} />
              <span className={bar} style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
              <span className={bar} style={{ transform: open ? "translateY(0) rotate(-45deg)" : "translateY(7px)" }} />
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-menu" aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink px-5 pb-10 pt-40 transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="mx-auto flex max-w-md flex-col gap-8">
          {groups.map((g, gi) => (
            <div key={g.title}>
              <p className="px-4 text-xs font-semibold uppercase tracking-[0.2em] text-sea/45">{g.title}</p>
              <div className="mt-2 flex flex-col gap-1">
                {g.links.map((l, i) => (
                  <Link key={l.href} href={l.href} tabIndex={open ? 0 : -1} aria-current={active(l.href) ? "page" : undefined} style={{ transitionDelay: open ? `${80 + (gi * 4 + i) * 40}ms` : "0ms" }}
                    className={`rounded-2xl px-4 py-3 text-2xl font-bold transition-all duration-300 active:bg-white/10 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${active(l.href) ? "bg-white/10 text-beam" : "text-sea"}`}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
