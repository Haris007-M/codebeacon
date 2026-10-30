import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { JOBS } from "@/lib/jobs";
import { SITE_URL } from "@/lib/site";
import { artKey } from "@/components/Art";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/blog", "/interview-prep", "/services", "/careers", "/faq", "/about", "/contact", "/privacy-policy"];
  const banner: Record<string, string> = { "/blog": "blog", "/careers": "about", "/interview-prep": "prep", "/services": "about", "/faq": "faq", "/about": "about", "/contact": "contact", "/privacy-policy": "privacy" };
  return [
    ...pages.map((p) => ({ url: SITE_URL + p, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7, images: banner[p] ? [`${SITE_URL}/images/banners/${banner[p]}.webp`] : [] })),
    ...JOBS.map((j) => ({ url: `${SITE_URL}/careers/${j.slug}`, lastModified: new Date(j.posted), changeFrequency: "weekly" as const, priority: 0.6 })),
    ...getAllPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.8, images: [`${SITE_URL}/images/covers/${artKey(p.category)}.webp`] })),
  ];
}
