import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, MessagesSquare, Search } from "lucide-react";
import { AdsterraResponsive } from "@/components/Adsterra";
import { getJob } from "@/lib/jobs";

export const metadata: Metadata = { title: "Application received", robots: { index: false, follow: true } };

const steps = [
  { icon: Mail, title: "Confirmation", text: "Keep an eye on your inbox, including the spam folder." },
  { icon: Search, title: "Review", text: "Our team reviews every application within 5–7 working days." },
  { icon: MessagesSquare, title: "Interview", text: "If your profile is a match, we will invite you to a short call." },
];

export default function ThankYou({ searchParams }: { searchParams: { job?: string } }) {
  const job = searchParams.job ? getJob(searchParams.job) : undefined;
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-sea md:px-12 md:py-16">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal/35 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-beam/15 blur-3xl" />
        <div className="relative">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal shadow-lg shadow-teal/40"><CheckCircle2 size={34} className="text-white" /></span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-5xl">Thank you for applying!</h1>
          <p className="mx-auto mt-4 max-w-xl text-sea/80 md:text-lg">
            {job ? <>We have received your application for <strong className="text-beam">{job.title}</strong>.</> : "We have received your application."} We will be in touch soon.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/careers#open-roles" className="inline-flex items-center justify-center gap-2 rounded-full bg-beam px-6 py-3 font-semibold text-ink transition hover:bg-white"><ArrowLeft size={18} /> View other roles</Link>
            <Link href="/blog" className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 font-semibold transition hover:bg-white/10">Read the blog</Link>
          </div>
        </div>
      </div>

      <h2 className="mt-14 text-center text-2xl font-bold">What happens next</h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="rounded-3xl border border-mist bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-beam text-sm font-extrabold text-ink">{i + 1}</span>
              <Icon className="text-teal" size={22} />
            </div>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-1 text-ink/65">{text}</p>
          </li>
        ))}
      </ol>

      <AdsterraResponsive />
    </div>
  );
}
