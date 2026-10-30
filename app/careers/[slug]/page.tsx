import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Building2, CalendarDays, CheckCircle2, GraduationCap, MapPin } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import ApplyForm from "@/components/ApplyForm";
import { AdsterraRect } from "@/components/Adsterra";
import { JOBS, PERKS, getJob, postedOn, workplaceStyle } from "@/lib/jobs";

export const generateStaticParams = () => JOBS.map((j) => ({ slug: j.slug }));
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const job = getJob(params.slug);
  if (!job) return {};
  return pageMeta({ title: `${job.title} (${job.workplace}) — Careers`, description: job.summary, path: `/careers/${job.slug}`, image: "/images/banners/about.webp" });
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((i) => <li key={i} className="flex items-start gap-3 text-ink/80"><CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={18} />{i}</li>)}
      </ul>
    </section>
  );
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const job = getJob(params.slug);
  if (!job) notFound();
  const facts = [
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Building2, label: "Workplace", value: job.workplace },
    { icon: Briefcase, label: "Job type", value: job.type },
    { icon: GraduationCap, label: "Experience", value: job.experience },
    { icon: CalendarDays, label: "Posted", value: postedOn(job.posted) },
  ];
  const more = JOBS.filter((j) => j.slug !== job.slug && j.department === job.department).slice(0, 3);

  return (
    <>
      <header className="relative overflow-hidden bg-ink text-sea">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-beam/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
          <Link href="/careers#open-roles" className="inline-flex items-center gap-1.5 text-sm font-medium text-sea/70 hover:text-beam"><ArrowLeft size={16} /> All open positions</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-beam">{job.department}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${workplaceStyle[job.workplace]}`}>{job.workplace}</span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">{job.title}</h1>
          <p className="mt-4 max-w-2xl text-sea/80 md:text-lg">{job.summary}</p>
          <a href="#apply" className="mt-7 inline-flex items-center rounded-full bg-beam px-6 py-3 font-semibold text-ink transition hover:bg-white">Apply now</a>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-3">
        <article className="min-w-0 lg:col-span-2">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-mist bg-white p-4">
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50"><Icon size={14} />{label}</dt>
                <dd className="mt-1 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="text-xl font-bold md:text-2xl">About the role</h2>
            <p className="mt-3 font-body text-lg leading-relaxed text-ink/80">{job.about}</p>
          </section>
          <List title="What you will do" items={job.responsibilities} />
          <List title="What we are looking for" items={job.requirements} />
          <List title="Nice to have" items={job.niceToHave} />

          <section className="mt-10">
            <h2 className="text-xl font-bold md:text-2xl">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">{job.skills.map((s) => <span key={s} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium ring-1 ring-mist">{s}</span>)}</div>
          </section>

          <section className="mt-10 rounded-3xl bg-ink p-6 text-sea md:p-8">
            <h2 className="text-xl font-bold md:text-2xl">What we offer</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {PERKS.map((p) => <li key={p} className="flex items-start gap-2.5"><CheckCircle2 className="mt-0.5 shrink-0 text-beam" size={18} />{p}</li>)}
            </ul>
            <p className="mt-5 text-sm text-sea/60">Salary is competitive and based on experience. We discuss it with shortlisted candidates.</p>
          </section>

          <section id="apply" className="mt-12 scroll-mt-24 rounded-3xl border border-mist bg-white p-5 sm:p-8">
            <h2 className="text-2xl font-bold">Apply for {job.title}</h2>
            <p className="mt-1 mb-6 text-ink/60">It takes about 3 minutes. Fields marked <span className="text-red-600">*</span> are required.</p>
            <ApplyForm slug={job.slug} title={job.title} />
          </section>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-mist bg-white p-6">
            <h2 className="text-lg font-bold">Ready to apply?</h2>
            <p className="mt-1 text-sm text-ink/60">Send your details and CV. We reply to every applicant.</p>
            <a href="#apply" className="mt-4 flex w-full justify-center rounded-full bg-teal px-5 py-3 font-semibold text-white transition hover:brightness-110">Apply now</a>
          </div>
          {more.length > 0 && (
            <div className="mt-5 rounded-3xl border border-mist bg-white p-6">
              <h2 className="text-lg font-bold">Similar roles</h2>
              <ul className="mt-3 divide-y divide-mist">
                {more.map((j) => (
                  <li key={j.slug}><Link href={`/careers/${j.slug}`} className="block py-3 hover:text-teal"><span className="font-semibold">{j.title}</span><span className="block text-sm text-ink/55">{j.workplace} · {j.type}</span></Link></li>
                ))}
              </ul>
            </div>
          )}
          <div className="hidden lg:block"><AdsterraRect className="!my-6" /></div>
        </aside>
      </div>
    </>
  );
}
