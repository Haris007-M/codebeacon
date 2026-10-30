import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Target, BookOpenCheck, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = pageMeta({ title: "About", description: "CodeBeacon helps frontend developers prepare for interviews with clear, practical answers.", path: "/about", image: "/images/banners/about.webp" });

const values = [
  { icon: Target, title: "Practical", text: "Answers written the way you would say them in a real interview." },
  { icon: BookOpenCheck, title: "Accurate", text: "Concepts are checked against official documentation and kept up to date." },
  { icon: Users, title: "For every level", text: "From first interview to senior frontend roles." },
];

export default function About() {
  return (
    <>
      <PageHeader art="about" title="About CodeBeacon" intro="A free resource for developers preparing for frontend interviews." />
      <div className="mx-auto max-w-3xl px-6 py-16 font-body text-lg leading-8 text-ink/90">
        <p>CodeBeacon publishes interview questions, explanations and updates for React, Next.js, JavaScript, TypeScript, Tailwind CSS, GSAP, Framer Motion and Git.</p>
        <p className="mt-5">Many interview guides list questions without explaining the reasoning. Here, each article gives a short answer you can say out loud, then the detail behind it, so you understand the topic instead of memorizing it.</p>
        <p className="mt-5">The site is supported by advertising and, in the future, affiliate links to products we recommend. Content is never changed because of an advertiser.</p>
      </div>
      <Reveal className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3">
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-mist bg-white p-6">
            <Icon className="text-teal" size={28} />
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            <p className="mt-1 text-ink/70">{text}</p>
          </div>
        ))}
      </Reveal>
    </>
  );
}
