import Link from "next/link";
import { Clock } from "lucide-react";
import Cover from "@/components/Cover";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-mist bg-white shadow-sm transition duration-300 active:scale-[0.99] hover:-translate-y-1 hover:border-teal hover:shadow-xl hover:shadow-ink/10">
      <Cover category={post.category} className="h-44" />
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-medium text-teal">{post.category}</span>
          <h3 className="mt-4 text-xl font-bold leading-snug group-hover:text-teal">{post.title}</h3>
          <p className="mt-2 text-ink/70">{post.description}</p>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-ink/60">
          <Clock size={14} /> {post.readTime} · {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
        </p>
      </div>
    </Link>
  );
}
