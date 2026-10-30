import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookMarked, ExternalLink } from "lucide-react";
import Banner from "@/components/Banner";
import Cover from "@/components/Cover";
import { artKey } from "@/components/Art";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import { AdsterraBanner, AdsterraNative } from "@/components/Adsterra";
import { AD_SLOTS } from "@/lib/ads";
import { getAllPosts, getPost, slugify } from "@/lib/posts";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const { title, description, date, category } = post.meta;
  return {
    title, description,
    alternates: { canonical: `/blog/${params.slug}` },
    keywords: [category, `${category} interview questions`, `${category} interview questions and answers`, "frontend interview", title],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    openGraph: { type: "article", title, description, publishedTime: date, modifiedTime: date, section: category, tags: [category, "interview questions"], url: `/blog/${params.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const { meta, html, toc, faq, words } = post;
  const url = `${SITE_URL}/blog/${meta.slug}`;
  const related = getAllPosts().filter((p) => p.slug !== meta.slug).sort((a, b) => Number(b.category === meta.category) - Number(a.category === meta.category)).slice(0, 2);
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BlogPosting", headline: meta.title, description: meta.description, image: [`${url}/opengraph-image`, `${SITE_URL}/images/covers/${artKey(meta.category)}.webp`], datePublished: meta.date, dateModified: meta.date, articleSection: meta.category, wordCount: words, inLanguage: "en", mainEntityOfPage: url, author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL }, publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: meta.title, item: url },
          ] },
          ...(faq.length >= 3 ? [{ "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
        ],
      }} />
      <header className="relative overflow-hidden bg-ink text-sea">
        <Cover category={meta.category} priority className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-5 py-14 md:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-sea/70">
            <Link href="/" className="hover:text-beam">Home</Link> / <Link href="/blog" className="hover:text-beam">Blog</Link> / <Link href={`/topics/${slugify(meta.category)}`} className="hover:text-beam">{meta.category}</Link>
          </nav>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{meta.title}</h1>
          <p className="mt-4 text-sea/75"><time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString("en-US", { dateStyle: "long" })}</time> · {meta.readTime}</p>
        </div>
      </header>
      <aside className="fixed right-6 top-32 z-10 hidden 2xl:block"><AdsterraBanner unit="banner160" /></aside>
      <article className="mx-auto max-w-3xl px-5 py-12">
        {toc.length > 2 && (
          <nav aria-label="Table of contents" className="mb-10 rounded-3xl border border-mist bg-white p-6">
            <p className="font-bold">On this page</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-teal">
              {toc.map((t) => <li key={t.id}><a href={`#${t.id}`} className="hover:underline">{t.text}</a></li>)}
            </ol>
          </nav>
        )}
        <AdSlot slot={AD_SLOTS.postTop} />
        <AdsterraBanner unit="banner468" className="mb-10 hidden sm:flex" />
        <div className="prose-post" dangerouslySetInnerHTML={{ __html: html }} />
        {meta.links && meta.links.length > 0 && (
          <section className="mt-14 rounded-3xl border border-mist bg-white p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold"><BookMarked size={20} className="text-teal" /> Related resources</h2>
            <ul className="mt-4 space-y-3">
              {meta.links.map((l) => {
                const [label, href] = l.split("|");
                return <li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-teal hover:underline">{label}<ExternalLink size={14} /></a></li>;
              })}
            </ul>
          </section>
        )}
        <AdSlot slot={AD_SLOTS.postBottom} />
        <AdsterraNative />
        <Banner title="Keep practicing" text="Follow the topic-by-topic checklist and turn what you read into interview-ready answers." href="/interview-prep" cta="Open interview prep" />
        <h2 className="text-2xl font-bold">Keep reading</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </article>
    </>
  );
}
