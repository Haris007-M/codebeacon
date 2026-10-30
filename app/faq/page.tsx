import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = pageMeta({ title: "FAQ", description: "Answers to common questions about CodeBeacon and frontend interview preparation.", path: "/faq", image: "/images/banners/faq.webp" });

const faqs = [
  ["What is CodeBeacon?", "A free site with interview questions, answers and updates for frontend developers working with React, Next.js, JavaScript, TypeScript, Tailwind CSS, GSAP, Framer Motion and Git."],
  ["Is the content free?", "Yes. All articles are free to read. The site is supported by ads."],
  ["Who is it for?", "Beginners preparing for a first role through to experienced developers refreshing the fundamentals."],
  ["How often is new content added?", "We publish new articles regularly and update older ones when frameworks change."],
  ["How should I use the articles?", "Read the short answer first, say it out loud in your own words, then read the detail. Then try building a small example."],
  ["Do you collect my personal data?", "We do not ask for or store personal details through the site. See the Privacy Policy for how analytics and advertising cookies work."],
  ["I found a mistake. What should I do?", "Please email us from the Contact page and we will correct it."],
];

export default function Faq() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <PageHeader art="faq" title="Frequently asked questions" intro="Quick answers about the site and how to prepare." />
      <div className="mx-auto max-w-3xl space-y-3 px-6 py-16">
        {faqs.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-mist bg-white p-5 open:border-teal">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
              {q}
              <ChevronDown className="shrink-0 transition group-open:rotate-180" size={20} />
            </summary>
            <p className="mt-3 font-body text-ink/80">{a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
