"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Content is always visible by default. It only animates once it scrolls into view,
// so a failed animation can never leave the page blank.
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const kids = Array.from(el.children);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.fromTo(kids, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "opacity,transform" });
        io.disconnect();
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
