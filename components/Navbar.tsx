"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/topics", label: "Topics" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${open ? "border-white/10 bg-ink text-sea" : "border-mist bg-sea/90 text-ink backdrop-blur"}`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3" aria-label="Main">
          <Link href="/" aria-label="CodeBeacon home"><Logo light={open} /></Link>
          <div className="hidden gap-6 font-medium lg:flex">
            {links.map((l) => <Link key={l.href} href={l.href} className={active(l.href) ? "text-teal" : "hover:text-teal"}>{l.label}</Link>)}
          </div>
          <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"
            className={`relative h-11 w-11 rounded-full text-sea transition-colors lg:hidden ${open ? "bg-white/10" : "bg-ink"}`}>
            <span className={bar} style={{ transform: open ? "translateY(0) rotate(45deg)" : "translateY(-7px)" }} />
            <span className={bar} style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
            <span className={bar} style={{ transform: open ? "translateY(0) rotate(-45deg)" : "translateY(7px)" }} />
          </button>
        </nav>
      </header>

      <div id="mobile-menu" aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-ink px-5 pb-10 pt-28 transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="mx-auto flex max-w-md flex-col gap-1">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={`rounded-2xl px-4 py-3.5 text-2xl font-bold transition-all duration-300 active:bg-white/10 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${active(l.href) ? "bg-white/10 text-beam" : "text-sea"}`}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
