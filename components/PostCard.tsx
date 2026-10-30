import Link from "next/link";
import { Atom, Braces, Clock, FileCode2, GitBranch, Globe, Layers, Monitor, Wind, Zap, type LucideIcon } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

// Per-category icon + side-tab colours (numbered tab, like the reference card design)
const style: Record<string, { icon: LucideIcon; tab: string }> = {
  React: { icon: Atom, tab: "from-[#38bdf8] to-[#0284c7]/70" },
  "Next.js": { icon: Globe, tab: "from-[#64748b] to-[#1e293b]/70" },
  TypeScript: { icon: Braces, tab: "from-[#3b82f6] to-[#1d4ed8]/70" },
  "Tailwind CSS": { icon: Wind, tab: "from-[#2dd4bf] to-[#0d9488]/70" },
  GSAP: { icon: Zap, tab: "from-[#84cc16] to-[#16a34a]/70" },
  "Framer Motion": { icon: Layers, tab: "from-[#d946ef] to-[#9333ea]/70" },
  Git: { icon: GitBranch, tab: "from-[#fb923c] to-[#ef4444]/70" },
  JavaScript: { icon: FileCode2, tab: "from-[#fcd34d] to-[#f59e0b]/70" },
};
const fallback = { icon: Monitor, tab: "from-[#f472b6] to-[#db2777]/70" };

export default function PostCard({ post }: { post: PostMeta }) {
  const { icon: Icon, tab } = style[post.category] ?? fallback;
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ counterIncrement: "post" }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-white to-sea py-6 pl-6 pr-14 shadow-[0_10px_30px_-8px_rgba(11,31,51,0.22),0_2px_6px_rgba(11,31,51,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-10px_rgba(11,31,51,0.3)] active:scale-[0.99]"
    >
      {/* coloured numbered side tab */}
      <span aria-hidden className={`absolute inset-y-0 right-0 flex w-10 justify-center bg-gradient-to-b pt-3 ${tab}`}>
        <span className="text-sm font-bold text-white drop-shadow-sm after:content-[counter(post)]" />
      </span>

      <Icon size={26} strokeWidth={1.6} className="text-ink/70" aria-hidden />
      <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal">{post.category}</span>
      <h3 className="mt-1 border-b border-ink/10 pb-3 text-xl font-bold leading-snug group-hover:text-teal">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">{post.description}</p>
      <p className="mt-5 flex items-center gap-2 text-sm text-ink/60">
        <Clock size={14} /> {post.readTime} · {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
      </p>
    </Link>
  );
}
