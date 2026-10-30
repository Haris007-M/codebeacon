"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Clock, MapPin, Search, SearchX } from "lucide-react";
import { postedOn, workplaceStyle, type Job, type Workplace } from "@/lib/jobs";

const WORKPLACES: ("All" | Workplace)[] = ["All", "Remote", "On-site", "Hybrid"];
export default function JobBoard({ jobs }: { jobs: Job[] }) {
  const [q, setQ] = useState("");
  const [place, setPlace] = useState<"All" | Workplace>("All");
  const [dept, setDept] = useState("All");
  const depts = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))], [jobs]);

  const list = jobs.filter((j) => {
    const text = `${j.title} ${j.summary} ${j.skills.join(" ")}`.toLowerCase();
    return (place === "All" || j.workplace === place) && (dept === "All" || j.department === dept) && text.includes(q.trim().toLowerCase());
  });
  const reset = () => { setQ(""); setPlace("All"); setDept("All"); };
  const chip = (on: boolean) => `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${on ? "bg-ink text-sea" : "bg-white text-ink/70 ring-1 ring-mist hover:text-teal hover:ring-teal"}`;

  return (
    <div>
      <div className="rounded-3xl border border-mist bg-white p-4 shadow-sm sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search jobs</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by role or skill, e.g. React"
            className="w-full rounded-2xl border border-mist bg-sea/60 py-3 pl-11 pr-4 outline-none transition focus:border-teal focus:bg-white focus:ring-2 focus:ring-teal/30" />
        </label>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Workplace">
            {WORKPLACES.map((w) => <button key={w} type="button" aria-pressed={place === w} onClick={() => setPlace(w)} className={chip(place === w)}>{w}</button>)}
          </div>
          <label className="flex items-center gap-2 text-sm text-ink/60">
            Department
            <select value={dept} onChange={(e) => setDept(e.target.value)} className="rounded-xl border border-mist bg-white px-3 py-2 font-medium text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/30">
              {depts.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/60" aria-live="polite">{list.length} {list.length === 1 ? "open position" : "open positions"}</p>

      {list.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-3xl border border-dashed border-mist bg-white px-6 py-14 text-center">
          <SearchX className="text-ink/30" size={40} />
          <h3 className="mt-3 text-lg font-bold">No jobs match your filters</h3>
          <p className="mt-1 text-ink/60">Try a different keyword or clear the filters.</p>
          <button type="button" onClick={reset} className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-sea hover:bg-teal">Clear filters</button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4">
          {list.map((j) => (
            <li key={j.slug}>
              <Link href={`/careers/${j.slug}`} className="group flex flex-col gap-4 rounded-3xl border border-mist bg-white p-5 transition hover:-translate-y-0.5 hover:border-teal hover:shadow-[0_14px_34px_-14px_rgba(11,31,51,0.3)] sm:p-6 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal">{j.department}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${workplaceStyle[j.workplace]}`}>{j.workplace}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold group-hover:text-teal">{j.title}</h3>
                  <p className="mt-1 text-ink/65">{j.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink/60">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={15} />{j.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Briefcase size={15} />{j.type}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock size={15} />Posted {postedOn(j.posted)}</span>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-sea px-5 py-2.5 text-sm font-semibold text-ink transition group-hover:bg-teal group-hover:text-white md:self-center">
                  View &amp; apply <ArrowRight size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
