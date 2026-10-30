import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-body" });

const title = `${SITE_NAME}: React, Next.js and Frontend Interview Questions`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: ["React interview questions", "Next.js interview questions", "JavaScript interview questions", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Git interview questions", "frontend developer interview", "frontend interview preparation"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/", types: { "application/rss+xml": `${SITE_URL}/feed.xml` } },
  openGraph: { type: "website", url: SITE_URL, siteName: SITE_NAME, locale: "en_US", title, description: SITE_DESC },
  twitter: { card: "summary_large_image", title, description: SITE_DESC },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
  referrer: "origin-when-cross-origin",
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION, other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined },
};

export const viewport: Viewport = { themeColor: "#0B1F33", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, description: SITE_DESC, inLanguage: "en", publisher: { "@id": `${SITE_URL}/#org` } },
            { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 } },
          ],
        }} />
        <div className="bg-beam px-4 py-2 text-center text-sm font-medium text-ink">
          <Link href="/blog/frontend-developer-interview-roadmap" className="hover:underline">New: the frontend interview roadmap is live. Read it now</Link>
        </div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
