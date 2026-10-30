import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Mail, MessageSquareText } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: "Contact", description: "Get in touch with CodeBeacon for corrections, topic requests or partnerships.", path: "/contact", image: "/images/banners/contact.webp" });

export default function Contact() {
  return (
    <>
      <PageHeader art="contact" title="Contact" intro="Found a mistake or want a topic covered? Send us a message." />
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border border-mist bg-white p-6">
            <Mail className="text-teal" size={26} />
            <h2 className="mt-3 text-lg font-bold">Email</h2>
            <a href={`mailto:${EMAIL}`} className="font-semibold text-teal underline underline-offset-4">{EMAIL}</a>
          </div>
          <div className="rounded-2xl border border-mist bg-white p-6">
            <MessageSquareText className="text-teal" size={26} />
            <h2 className="mt-3 text-lg font-bold">Good reasons to write</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/70">
              <li>Corrections to an article</li><li>Interview topics you want covered</li><li>Advertising or partnerships</li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-3"><ContactForm /></div>
      </div>
    </>
  );
}
