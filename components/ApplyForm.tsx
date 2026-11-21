"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Loader2, Send, Upload, X } from "lucide-react";
import { EMAIL } from "@/lib/site";
import { AdsterraRect } from "@/components/Adsterra";

const field = "mt-1.5 w-full rounded-xl border border-mist bg-white px-4 py-3 text-base outline-none transition placeholder:text-ink/35 focus:border-teal focus:ring-2 focus:ring-teal/30";
const label = "block text-sm font-medium text-ink";
const MAX_MB = 4;

export default function ApplyForm({ slug, title }: { slug: string; title: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // After a successful submit, bring the thank-you message into view.
  useEffect(() => {
    if (status === "done") boxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status]);

  function pickFile(f: File | undefined) {
    setFileError("");
    if (!f) return setFile(null);
    if (!/\.(pdf|docx?)$/i.test(f.name)) { setFileError("Please upload a PDF, DOC or DOCX file."); if (fileRef.current) fileRef.current.value = ""; return setFile(null); }
    if (f.size > MAX_MB * 1024 * 1024) { setFileError(`The file is larger than ${MAX_MB} MB.`); if (fileRef.current) fileRef.current.value = ""; return setFile(null); }
    setFile(f);
  }
  function clearFile() { setFile(null); if (fileRef.current) fileRef.current.value = ""; }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    if (!file) { setFileError("Please attach your résumé / CV."); return; }
    const data = new FormData(e.currentTarget);
    data.set("position", title);
    data.set("job", slug);
    setErrorMsg("");
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", { method: "POST", body: data });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) throw new Error(json?.error || "failed");
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message !== "failed" && err.message !== "Failed to fetch" ? err.message : "");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div ref={boxRef} className="scroll-mt-24 text-center" role="status" aria-live="polite">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal shadow-lg shadow-teal/30"><CheckCircle2 size={34} className="text-white" /></span>
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">Thank you for applying!</h2>
        <p className="mx-auto mt-3 max-w-md text-ink/70">We have received your application for <strong>{title}</strong>. Our team reviews every application within 5–7 working days and will contact you by email.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/careers#open-roles" className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-white transition hover:brightness-110"><ArrowLeft size={18} /> View other roles</Link>
          <Link href="/blog" className="inline-flex items-center justify-center rounded-full border border-mist px-6 py-3 font-semibold transition hover:border-teal hover:text-teal">Read the blog</Link>
        </div>
        <div className="mt-10 border-t border-mist pt-2"><AdsterraRect className="!my-8" /></div>
      </div>
    );
  }

  return (
    <>
    <h2 className="text-2xl font-bold">Apply for {title}</h2>
    <p className="mt-1 mb-6 text-ink/60">It takes about 3 minutes. Fields marked <span className="text-red-600">*</span> are required.</p>
    <form onSubmit={onSubmit} className="space-y-5">
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this field empty<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>Full name <span className="text-red-600">*</span><input name="name" required autoComplete="name" placeholder="Your full name" className={field} /></label>
        <label className={label}>Email <span className="text-red-600">*</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} /></label>
        <label className={label}>Phone <span className="text-red-600">*</span><input name="phone" type="tel" required autoComplete="tel" placeholder="+92 300 0000000" className={field} /></label>
        <label className={label}>City / country<input name="location" autoComplete="address-level2" placeholder="Lahore, Pakistan" className={field} /></label>
        <label className={label}>Years of experience <span className="text-red-600">*</span>
          <select name="experience" required defaultValue="" className={field}>
            <option value="" disabled>Select</option>
            <option>Less than 1 year</option><option>1–2 years</option><option>3–5 years</option><option>5+ years</option>
          </select>
        </label>
        <label className={label}>Preferred workplace
          <select name="workplace" defaultValue="Any" className={field}>
            <option>Any</option><option>Remote</option><option>On-site</option><option>Hybrid</option>
          </select>
        </label>
      </div>
      <div>
        <span className={label}>Résumé / CV <span className="text-red-600">*</span></span>
        <label className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-7 text-center transition focus-within:ring-2 focus-within:ring-teal/30 ${fileError ? "border-red-400 bg-red-50/50" : file ? "border-teal bg-teal/5" : "border-mist bg-sea/50 hover:border-teal hover:bg-white"}`}
          onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f && fileRef.current) { const dt = new DataTransfer(); dt.items.add(f); fileRef.current.files = dt.files; } pickFile(f); }}>
          <input ref={fileRef} type="file" name="resume" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} aria-describedby="resume-help" />
          {file ? (
            <span className="flex w-full max-w-sm items-center gap-3 rounded-xl bg-white px-4 py-3 text-left ring-1 ring-mist">
              <FileText className="shrink-0 text-teal" size={24} />
              <span className="min-w-0 flex-1"><span className="block truncate font-semibold">{file.name}</span><span className="text-xs text-ink/55">{(file.size / 1024 / 1024).toFixed(2)} MB · click to change</span></span>
              <button type="button" onClick={(e) => { e.preventDefault(); clearFile(); }} aria-label="Remove file" className="rounded-full p-1.5 text-ink/50 hover:bg-sea hover:text-red-600"><X size={18} /></button>
            </span>
          ) : (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-teal ring-1 ring-mist"><Upload size={20} /></span>
              <span className="font-semibold"><span className="text-teal">Click to upload</span> or drag and drop</span>
            </>
          )}
          <span id="resume-help" className="text-xs text-ink/50">PDF, DOC or DOCX, up to {MAX_MB} MB</span>
        </label>
        {fileError && <p role="alert" className="mt-1.5 text-sm text-red-600">{fileError}</p>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>LinkedIn<input name="linkedin" type="url" placeholder="https://linkedin.com/in/…" className={field} /></label>
        <label className={label}>Portfolio / GitHub<input name="portfolio" type="url" placeholder="https://github.com/…" className={field} /></label>
      </div>
      <label className={label}>Why are you a good fit? <span className="text-red-600">*</span>
        <textarea name="message" required rows={5} minLength={30} placeholder="Tell us briefly about your experience and what interests you in this role." className={`${field} resize-y`} />
      </label>
      <label className="flex items-start gap-3 text-sm text-ink/70">
        <input type="checkbox" name="consent" value="yes" required className="mt-0.5 h-5 w-5 shrink-0 rounded border-mist accent-teal" />
        <span>I agree that CodeBeacon may store my details to review this application, as described in the <a href="/privacy-policy" className="text-teal underline underline-offset-2">Privacy Policy</a>.</span>
      </label>
      {status === "error" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg || "We could not send your application."} Please try again or email it to <a href={`mailto:${EMAIL}`} className="font-semibold underline">{EMAIL}</a>.</p>}
      <button disabled={status === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal/25 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 sm:w-auto">
        {status === "sending" ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : <><Send size={18} /> Submit application</>}
      </button>
    </form>
    </>
  );
}
