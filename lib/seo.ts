import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

/** Per-page metadata with canonical URL, Open Graph and Twitter cards that use the page's own banner image. */
export function pageMeta({ title, description, path, image, imageAlt }: { title: string; description: string; path: string; image: string; imageAlt?: string }): Metadata {
  const images = [{ url: image, width: 2400, height: 800, alt: imageAlt ?? title }];
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: SITE_NAME, locale: "en_US", title: `${title} | ${SITE_NAME}`, description, images },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description, images: [image] },
  };
}
