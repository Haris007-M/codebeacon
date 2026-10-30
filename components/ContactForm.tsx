"use client";
import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { EMAIL } from "@/lib/site";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT; // e.g. a Formspree URL (optional)
const field = "mt-1 w-full rounded-xl border border-mist bg-white px-4 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/30";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
        if (!res.ok) throw new Error("failed");
      } else {
        const body = `Name: ${d.name}\nEmail: ${d.email}\n\n${d.message}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`[${d.topic}] ${d.name}`)}&body=${encodeURIComponent(body)}`;
      }
      await new Promise((r) => setTimeout(r, 1200));
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-teal bg-white p-8 text-center">
        <CheckCircle2 className="text-teal" size={48} />
        <h2 className="mt-4 text-2xl font-bold">Thanks for your message</h2>
        <p className="mt-2 max-w-sm text-ink/70">We will reply to the email you gave us, usually within a few days.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 font-semibold text-teal underline underline-offset-4">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-mist bg-white p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">Name<input name="name" required className={field} /></label>
        <label className="block text-sm font-medium">Email<input name="email" type="email" required className={field} /></label>
      </div>
      <label className="mt-5 block text-sm font-medium">Topic
        <select name="topic" className={field}>
          <option>Correction</option><option>Topic request</option><option>Partnership</option><option>Other</option>
        </select>
      </label>
      <label className="mt-5 block text-sm font-medium">Message<textarea name="message" required rows={5} className={field} /></label>
      <p className="mt-4 text-sm text-ink/60">We use your details only to reply to this message. See the <a href="/privacy-policy" className="text-teal underline">Privacy Policy</a>.</p>
      {status === "error" && <p role="alert" className="mt-3 text-sm text-red-600">Could not send. Please email us directly at {EMAIL}.</p>}
      <button disabled={status === "sending"} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-sea transition hover:bg-teal disabled:opacity-60">
        {status === "sending" ? <><Loader2 size={18} className="animate-spin" /> Sending</> : <><Send size={18} /> Send message</>}
      </button>
    </form>
  );
}
