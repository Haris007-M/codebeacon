import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import Banner from "@/components/Banner";
import Reveal from "@/components/Reveal";
import { AdsterraResponsive, AdsterraRect, AdsterraTower } from "@/components/Adsterra";
import { getAllPosts, getCategories } from "@/lib/posts";

export const metadata: Metadata = pageMeta({ title: "Blog: Frontend Interview Questions and Answers", description: "Interview questions with clear answers and code examples for React, Next.js, JavaScript, TypeScript, Tailwind CSS, GSAP, Framer Motion and Git.", path: "/blog", image: "/images/banners/blog.webp" });

export default function BlogIndex({ searchParams }: { searchParams: { topic?: string } }) {
  const cats = getCategories();
  const current = cats.find((c) => c.slug === searchParams.topic);
  const posts = getAllPosts().filter((p) => !current || p.category === current.name);
  const pill = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-medium transition ${on ? "border-ink bg-ink text-sea" : "border-mist bg-white hover:border-teal hover:text-teal"}`;
  return (
    <>
      <AdsterraTower />
      <PageHeader art="blog" title="Blog" intro="Interview questions with clear answers, code examples and links to go deeper." />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <nav aria-label="Filter by topic" className="flex flex-wrap gap-2">
          <Link href="/blog" scroll={false} aria-current={!current ? "page" : undefined} className={pill(!current)}>All ({getAllPosts().length})</Link>
          {cats.map((c) => (
            <Link key={c.slug} href={`/blog?topic=${c.slug}`} scroll={false} aria-current={current?.slug === c.slug ? "page" : undefined} className={pill(current?.slug === c.slug)}>{c.name} ({c.count})</Link>
          ))}
        </nav>
        {current && <h2 className="mt-8 text-2xl font-bold">{current.name} articles</h2>}
        <Reveal className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</Reveal>
        <AdsterraResponsive />
        <Banner title="Study with a plan" text="Pick a track, work through the checklist and read the matching articles." href="/interview-prep" cta="Interview prep" />
      </div>
    </>
  );
}
