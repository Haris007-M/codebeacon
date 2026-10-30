import type { MetadataRoute } from "next";
import { getAllPosts, getCategories } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { artKey } from "@/components/Art";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/blog", "/topics", "/interview-prep", "/faq", "/about", "/contact", "/privacy-policy"];
  const banner: Record<string, string> = { "/blog": "blog", "/topics": "topics", "/interview-prep": "prep", "/faq": "faq", "/about": "about", "/contact": "contact", "/privacy-policy": "privacy" };
  return [
    ...pages.map((p) => ({ url: SITE_URL + p, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7, images: banner[p] ? [`${SITE_URL}/images/banners/${banner[p]}.webp`] : [] })),
    ...getCategories().map((c) => ({ url: `${SITE_URL}/topics/${c.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7, images: [`${SITE_URL}/images/banners/${artKey(c.name)}.webp`] })),
    ...getAllPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.8, images: [`${SITE_URL}/images/covers/${artKey(p.category)}.webp`] })),
  ];
}
