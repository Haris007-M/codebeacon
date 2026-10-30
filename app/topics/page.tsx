import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Cover from "@/components/Cover";
import { getCategories } from "@/lib/posts";

export const metadata: Metadata = pageMeta({ title: "Topics: React, Next.js, TypeScript, Tailwind, GSAP and Git", description: "Browse frontend interview questions by topic: React, Next.js, JavaScript, TypeScript, Tailwind CSS, GSAP, Framer Motion and Git.", path: "/topics", image: "/images/banners/topics.webp" });

export default function Topics() {
  return (
    <>
      <PageHeader art="topics" title="Topics" intro="Pick a technology and read every article about it." />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {getCategories().map((c) => (
          <Link key={c.slug} href={`/topics/${c.slug}`} className="group overflow-hidden rounded-3xl border border-mist bg-white transition active:scale-[0.99] hover:border-teal">
            <Cover category={c.name} className="h-32" />
            <div className="p-5"><h2 className="text-xl font-bold group-hover:text-teal">{c.name}</h2><p className="text-ink/60">{c.count} {c.count === 1 ? "article" : "articles"}</p></div>
          </Link>
        ))}
      </div>
    </>
  );
}
