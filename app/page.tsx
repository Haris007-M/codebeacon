import Link from "next/link";
import { Code2, Layers, Braces, FileType, Palette, Clapperboard, Sparkles, GitBranch, ListChecks, BookMarked, Code, ShieldCheck, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import PostCard from "@/components/PostCard";
import Banner from "@/components/Banner";
import { getAllPosts, slugify } from "@/lib/posts";

const topics = [
  { name: "React", icon: Code2 }, { name: "Next.js", icon: Layers }, { name: "JavaScript", icon: Braces }, { name: "TypeScript", icon: FileType },
  { name: "Tailwind CSS", icon: Palette }, { name: "GSAP", icon: Clapperboard }, { name: "Framer Motion", icon: Sparkles }, { name: "Git", icon: GitBranch },
];
const path = [
  { title: "Learn the fundamentals", text: "HTML, CSS, JavaScript and Git come first. Weak basics cost the most points.", href: "/blog/frontend-developer-interview-roadmap", cta: "Read the roadmap" },
  { title: "Master your framework", text: "React, Next.js and TypeScript: rendering, hooks, data fetching and types.", href: "/topics/react", cta: "Browse React" },
  { title: "Practice out loud", text: "Answer each question in your own words, then check it against the article.", href: "/interview-prep", cta: "Use the checklist" },
];
const why = [
  { icon: ListChecks, title: "Short answers first", text: "Each question starts with an answer you can say in an interview, then goes deeper." },
  { icon: Code, title: "Code you can run", text: "Examples are small and complete, so you can paste them and experiment." },
  { icon: BookMarked, title: "Official sources", text: "Every article links to the documentation so you can verify and keep learning." },
];
const faqs = [
  ["Is CodeBeacon free?", "Yes. Every article is free to read."],
  ["Who is it for?", "Beginners preparing for a first role through to experienced developers refreshing the basics."],
  ["How should I study?", "Read the short answer, say it out loud, then read the detail and try the code."],
];

export default function Home() {
  const posts = getAllPosts().slice(0, 6);
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="text-3xl font-bold">Browse by topic</h2>
        <Reveal className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {topics.map(({ name, icon: Icon }) => (
            <Link key={name} href={`/topics/${slugify(name)}`} className="group rounded-3xl bg-ink p-5 text-sea transition active:scale-[0.98] hover:bg-teal">
              <Icon className="text-beam group-hover:text-white" size={28} />
              <h3 className="mt-4 text-lg font-bold">{name}</h3>
              <p className="mt-1 text-sm text-sea/70">Questions and answers</p>
            </Link>
          ))}
        </Reveal>
      </section>

      <div className="mx-auto max-w-6xl px-5"><Banner title="New to frontend interviews?" text="Start with the roadmap: what to study, in what order, and how to practice." href="/blog/frontend-developer-interview-roadmap" cta="Read the roadmap" /></div>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold">Latest articles</h2>
          <Link href="/blog" className="font-medium text-teal hover:underline">All articles</Link>
        </div>
        <Reveal className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <h2 className="text-3xl font-bold">A simple path to interview-ready</h2>
        <Reveal className="mt-8 grid gap-5 md:grid-cols-3">
          {path.map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-mist bg-white p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-beam font-extrabold text-ink">{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-ink/70">{s.text}</p>
              <Link href={s.href} className="mt-4 inline-flex items-center gap-1.5 font-semibold text-teal hover:underline">{s.cta} <ArrowRight size={16} /></Link>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">Learn from code, not just theory</h2>
          <p className="mt-4 text-lg text-ink/70">Closures, hooks and rendering make sense once you see them run. Every article includes examples you can copy.</p>
          <Link href="/blog/javascript-closures-and-event-loop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-sea hover:bg-teal">Try the closures article <ArrowRight size={18} /></Link>
        </div>
        <pre className="overflow-x-auto rounded-3xl bg-ink p-6 text-[13px] leading-relaxed text-sea shadow-xl sm:text-sm"><code>{`function counter() {
  let n = 0;          // remembered by the closure
  return () => ++n;
}

const next = counter();
next(); // 1
next(); // 2`}</code></pre>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5">
        <h2 className="text-3xl font-bold">Why developers use CodeBeacon</h2>
        <Reveal className="mt-8 grid gap-5 md:grid-cols-3">
          {why.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-gradient-to-br from-white to-mist/40 p-6 ring-1 ring-mist">
              <Icon className="text-teal" size={30} />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-ink/70">{text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto mt-20 max-w-3xl px-5">
        <h2 className="text-center text-3xl font-bold">Quick answers</h2>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="rounded-2xl border border-mist bg-white p-5 open:border-teal">
              <summary className="cursor-pointer text-lg font-semibold">{q}</summary>
              <p className="mt-2 font-body text-ink/80">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-5 text-center"><Link href="/faq" className="font-semibold text-teal hover:underline">See all questions</Link></p>
      </section>

      <div className="mx-auto max-w-6xl px-5"><Banner title="Ready to practice?" text="Work through the checklist for each topic and turn what you read into answers you can give." href="/interview-prep" cta="Open interview prep" /></div>
    </>
  );
}
