import { artKey } from "@/components/Art";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import Banner from "@/components/Banner";
import JsonLd from "@/components/JsonLd";
import { AdsterraResponsive, AdsterraRect, AdsterraTower } from "@/components/Adsterra";
import { getAllPosts, getCategories } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const generateStaticParams = () => getCategories().map((c) => ({ topic: c.slug }));
const find = (slug: string) => getCategories().find((c) => c.slug === slug);

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const c = find(params.topic);
  if (!c) return {};
  return pageMeta({ title: `${c.name} Interview Questions and Answers`, description: `${c.name} interview questions with clear answers, code examples and links to official documentation.`, path: `/topics/${c.slug}`, image: `/images/banners/${artKey(c.name)}.webp` });
}

export default function Topic({ params }: { params: { topic: string } }) {
  const c = find(params.topic);
  if (!c) notFound();
  const posts = getAllPosts().filter((p) => p.category === c.name);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", name: `${c.name} interview questions`, url: `${SITE_URL}/topics/${c.slug}`, image: `${SITE_URL}/images/banners/${artKey(c.name)}.webp`, hasPart: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}` })) }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Topics", item: `${SITE_URL}/topics` }, { "@type": "ListItem", position: 3, name: c.name, item: `${SITE_URL}/topics/${c.slug}` }] }] }} />
      <PageHeader art={artKey(c.name)} title={`${c.name} interview questions`} intro={`${c.count} ${c.count === 1 ? "article" : "articles"} with answers and code examples.`} />
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        <AdsterraResponsive />
        <Banner title="Explore more topics" text="See every technology we cover and pick what to study next." href="/topics" cta="All topics" />
      </div>
    </>
  );
}
