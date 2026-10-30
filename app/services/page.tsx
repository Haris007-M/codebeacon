import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CandlestickChart, Users, UtensilsCrossed, Scale, Globe, AppWindow, LayoutDashboard, Check, Mail } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { SITE_URL, SITE_NAME, EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Web Development Services & Custom Software",
    description: "Custom Trading CRM, HRM, restaurant order management and law firm management systems, plus websites, web applications and portals built with React, Next.js and TypeScript.",
    path: "/services",
    image: "/images/banners/about.webp",
  }),
  keywords: ["trading CRM development", "forex CRM", "HRM software", "HR management system", "restaurant order management system", "law firm management software", "custom web application development", "Next.js developer", "React developer for hire", "client portal development"],
};

const products = [
  {
    icon: CandlestickChart, name: "Trading CRM", slug: "trading-crm",
    text: "A CRM for brokers and trading firms to manage leads, clients and accounts in one place.",
    features: ["Lead and client management", "KYC document handling", "Deposits, withdrawals and wallet tracking", "IB / affiliate and commission tracking", "Role-based access for sales and back office", "Reports and dashboards"],
  },
  {
    icon: Users, name: "HRM System", slug: "hrm",
    text: "Human resource management for growing teams, from hiring to payroll.",
    features: ["Employee records and documents", "Attendance and leave management", "Payroll and payslips", "Recruitment and onboarding", "Performance reviews", "Employee self-service portal"],
  },
  {
    icon: UtensilsCrossed, name: "Restaurant Order Management", slug: "restaurant",
    text: "Take, track and fulfil orders across dine-in, takeaway and delivery.",
    features: ["Online ordering and QR menus", "Point of sale (POS)", "Kitchen display system", "Table and reservation management", "Inventory and stock alerts", "Sales and menu reports"],
  },
  {
    icon: Scale, name: "Law Firm Management", slug: "law-firm",
    text: "Run cases, clients and billing for law firms with secure, organised records.",
    features: ["Case and matter management", "Client intake and client portal", "Document management", "Court dates, tasks and reminders", "Time tracking and invoicing", "Role-based permissions"],
  },
];

const services = [
  { icon: Globe, name: "Websites", text: "Fast, SEO-ready business websites, landing pages and blogs built with Next.js and Tailwind CSS." },
  { icon: AppWindow, name: "Web Applications", text: "Custom SaaS products, dashboards and internal tools with React, Next.js, TypeScript and secure APIs." },
  { icon: LayoutDashboard, name: "Portals", text: "Client, employee, vendor and admin portals with logins, roles, payments and integrations." },
];

const process = [
  ["Discovery", "We discuss your goals, users and must-have features."],
  ["Proposal", "You get a clear scope, timeline and quote."],
  ["Design & build", "Regular demos so you see progress every week."],
  ["Launch & support", "Deployment, training and ongoing maintenance."],
];

const faq = [
  ["Can you customise these systems for my business?", "Yes. Each product is a starting point and is tailored to your workflow, branding and integrations."],
  ["Which technologies do you use?", "Mainly React, Next.js, TypeScript, Node.js and Tailwind CSS, with databases such as PostgreSQL or MongoDB depending on the project."],
  ["Do you provide support after launch?", "Yes. Maintenance, updates and new features are available after launch."],
  ["How do I get a quote?", "Send a short description of what you need through the contact page or by email, and you will get a reply with next steps."],
];

export default function Services() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfessionalService", "@id": `${SITE_URL}/services#business`, name: `${SITE_NAME} Web Development`, url: `${SITE_URL}/services`, email: EMAIL, areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog", name: "Software products and web development services",
              itemListElement: [...products.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: p.name, applicationCategory: "BusinessApplication", description: p.text } })),
                ...services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.text } }))],
            },
          },
          { "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
          { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` }] },
        ],
      }} />

      <PageHeader art="about" title="Software & web development services" intro="Ready-to-customise business systems and custom websites, web apps and portals, built with React, Next.js and TypeScript." />

      <section className="mx-auto max-w-6xl px-6 pt-16" aria-labelledby="products">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Products</p>
        <h2 id="products" className="mt-2 text-3xl font-extrabold md:text-4xl">Business systems I build</h2>
        <Reveal className="mt-8 grid gap-6 md:grid-cols-2">
          {products.map(({ icon: Icon, name, slug, text, features }) => (
            <article key={slug} id={slug} className="flex flex-col rounded-3xl border border-mist bg-white p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-beam"><Icon size={24} /></span>
              <h3 className="mt-5 text-2xl font-bold">{name}</h3>
              <p className="mt-2 text-ink/70">{text}</p>
              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {features.map((f) => <li key={f} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-teal" />{f}</li>)}
              </ul>
              <Link href={`/contact?subject=${encodeURIComponent(name)}`} className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-teal hover:underline">
                Request a demo <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-20" aria-labelledby="services">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">Services</p>
        <h2 id="services" className="mt-2 text-3xl font-extrabold md:text-4xl">Custom development</h2>
        <Reveal className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, name, text }) => (
            <div key={name} className="rounded-3xl border border-mist bg-white p-7">
              <Icon size={28} className="text-teal" />
              <h3 className="mt-4 text-xl font-bold">{name}</h3>
              <p className="mt-2 text-ink/70">{text}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-ink/70">Also available: API integrations, payment gateways, admin dashboards, performance and SEO fixes, and maintenance for existing React or Next.js projects.</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-20" aria-labelledby="process">
        <h2 id="process" className="text-3xl font-extrabold md:text-4xl">How we work</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {process.map(([t, d], i) => (
            <li key={t} className="rounded-3xl bg-ink p-6 text-sea">
              <span className="text-3xl font-extrabold text-beam">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold">{t}</h3>
              <p className="mt-1 text-sm text-sea/75">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-20" aria-labelledby="services-faq">
        <h2 id="services-faq" className="text-3xl font-extrabold md:text-4xl">Questions</h2>
        <div className="mt-6 divide-y divide-mist rounded-3xl border border-mist bg-white">
          {faq.map(([q, a]) => (
            <details key={q} className="group p-6">
              <summary className="cursor-pointer list-none font-bold marker:hidden">{q}</summary>
              <p className="mt-2 text-ink/70">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-ink via-[#0d3a4f] to-teal p-8 text-sea md:p-12">
          <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-beam/25 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold md:text-4xl">Have a project in mind?</h2>
          <p className="relative mt-3 max-w-xl text-sea/80">Tell me what you need and get a free consultation and quote.</p>
          <div className="relative mt-6 flex flex-wrap gap-3">
            <Link href="/contact?subject=Project%20enquiry" className="inline-flex items-center gap-2 rounded-full bg-beam px-6 py-3 font-semibold text-ink transition hover:bg-white">Start a project <ArrowRight size={18} /></Link>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold hover:bg-white/10"><Mail size={18} /> {EMAIL}</a>
          </div>
        </div>
      </section>
    </>
  );
}
