import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" intro="The page you are looking for does not exist or has moved." />
      <div className="mx-auto flex max-w-3xl flex-wrap gap-3 px-5 py-14">
        {[["Home", "/"], ["Blog", "/blog"], ["Topics", "/topics"], ["Interview Prep", "/interview-prep"]].map(([l, h]) => (
          <Link key={h} href={h} className="rounded-full bg-ink px-6 py-3 font-semibold text-sea hover:bg-teal">{l}</Link>
        ))}
      </div>
    </>
  );
}
