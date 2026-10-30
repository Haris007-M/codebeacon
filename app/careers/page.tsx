import type { Metadata } from "next";
import { CheckCircle2, Globe2, GraduationCap, HeartHandshake } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";
import JobBoard from "@/components/JobBoard";
import { AdsterraResponsive } from "@/components/Adsterra";
import { JOBS, PERKS } from "@/lib/jobs";

export const metadata: Metadata = pageMeta({ title: "Careers", description: "Join CodeBeacon. Open roles for React, JavaScript, frontend and full stack developers, technical writers and SEO specialists — remote, on-site and hybrid.", path: "/careers", image: "/images/banners/about.webp" });

const values = [
  { icon: Globe2, title: "Work your way", text: "Remote, on-site and hybrid roles, with flexible hours." },
  { icon: GraduationCap, title: "Keep learning", text: "A yearly learning budget and time to grow your skills." },
  { icon: HeartHandshake, title: "Real impact", text: "Your work helps thousands of developers get hired." },
];

export default function Careers() {
  return (
    <>
      <PageHeader art="about" title="Careers at CodeBeacon" intro="Help developers learn, prepare and get hired. Browse our open roles and apply in a few minutes." />

      <section className="mx-auto max-w-6xl px-5 pt-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-mist bg-white p-6">
              <Icon className="text-teal" size={28} />
              <h2 className="mt-3 text-lg font-bold">{title}</h2>
              <p className="mt-1 text-ink/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="open-roles" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16">
        <h2 className="text-3xl font-bold">Open positions</h2>
        <p className="mt-2 text-ink/65">Filter by workplace or department, then open a role to see the details and apply.</p>
        <div className="mt-6"><JobBoard jobs={JOBS} /></div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-16">
        <div className="rounded-3xl bg-ink p-8 text-sea md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">Benefits for every role</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((p) => <li key={p} className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 shrink-0 text-beam" size={18} />{p}</li>)}
          </ul>
        </div>
        <AdsterraResponsive />
      </section>
    </>
  );
}
