import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Code2, Layers, Braces, Palette, Clapperboard, GitBranch, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { AdsterraResponsive, AdsterraRect, AdsterraTower } from "@/components/Adsterra";

export const metadata: Metadata = pageMeta({ title: "Interview Prep", description: "A topic-by-topic checklist for React, Next.js, JavaScript, Tailwind CSS, animation and Git interviews.", path: "/interview-prep", image: "/images/banners/prep.webp" });

const tracks = [
  { icon: Braces, name: "JavaScript", items: ["Closures and scope", "Event loop and promises", "this, prototypes, classes", "Array methods and ES6+"] },
  { icon: Code2, name: "React", items: ["Props vs state", "Hooks and effects", "Rendering and keys", "Performance and memoization"] },
  { icon: Layers, name: "Next.js", items: ["App Router and layouts", "Server vs client components", "SSG, SSR and ISR", "SEO and metadata"] },
  { icon: Palette, name: "Tailwind CSS", items: ["Utility-first approach", "Responsive and dark mode", "Theme customization", "Component extraction"] },
  { icon: Clapperboard, name: "GSAP and Framer Motion", items: ["Timelines and ScrollTrigger", "Cleanup in React", "AnimatePresence and layout", "Reduced motion"] },
  { icon: GitBranch, name: "Git", items: ["Merge vs rebase", "Reset vs revert", "Stash and cherry-pick", "Resolving conflicts"] },
];

export default function InterviewPrep() {
  return (
    <>
      <PageHeader art="prep" title="Interview preparation" intro="Work through each track, then read the matching articles on the blog." />
      <Reveal className="mx-auto grid max-w-6xl gap-5 px-6 py-16 md:grid-cols-2 lg:grid-cols-3">
        {tracks.map(({ icon: Icon, name, items }) => (
          <div key={name} className="rounded-2xl border border-mist bg-white p-6">
            <Icon className="text-teal" size={28} />
            <h2 className="mt-3 text-xl font-bold">{name}</h2>
            <ul className="mt-3 space-y-2">
              {items.map((i) => (
                <li key={i} className="flex items-start gap-2 text-ink/80"><Check size={18} className="mt-0.5 shrink-0 text-teal" />{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/blog" className="inline-flex rounded-full bg-ink px-6 py-3 font-semibold text-sea hover:bg-teal">Read the articles</Link>
        <AdsterraResponsive className="!mt-20" />
      </div>
    </>
  );
}
