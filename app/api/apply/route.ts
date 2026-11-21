import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Receives the career application (multipart/form-data) and delivers it.
//
// Delivery, in order:
//  1. Email through Resend's HTTP API when RESEND_API_KEY is set (no npm package needed).
//  2. Otherwise, while running locally (npm run dev), the application and CV are saved in ./applications
//     so you can test the whole flow without any setup.
//  3. Otherwise (production with nothing configured) it answers with an error. It never pretends it was sent.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB: stays under Vercel's 4.5 MB request limit
const FILE_OK = /\.(pdf|docx?)$/i;
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (v: FormDataEntryValue | null, max = 3000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
const safeName = (s: string) => s.replace(/[^\w.\- ]+/g, "_").slice(0, 100) || "resume";
const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("We could not read the form. Please try again.");
  }

  // Honeypot: real people never see or fill this field. Bots do. Pretend success and drop it.
  if (text(form.get("company_website"))) return NextResponse.json({ ok: true });

  const name = text(form.get("name"), 120);
  const email = text(form.get("email"), 160);
  const phone = text(form.get("phone"), 40);
  const location = text(form.get("location"), 120);
  const experience = text(form.get("experience"), 40);
  const workplace = text(form.get("workplace"), 40);
  const linkedin = text(form.get("linkedin"), 300);
  const portfolio = text(form.get("portfolio"), 300);
  const message = text(form.get("message"), 5000);
  const position = oneLine(text(form.get("position"), 160)) || "Open application";
  const consent = text(form.get("consent"), 10);
  const resume = form.get("resume");

  if (!name || !EMAIL_OK.test(email) || !phone || !experience) return fail("Please fill in your name, a valid email, phone and experience.");
  if (message.length < 30) return fail("Please write at least 30 characters about why you are a good fit.");
  if (consent !== "yes") return fail("Please accept the privacy consent to continue.");
  if (!(resume instanceof File) || resume.size === 0) return fail("Please attach your résumé / CV.");
  if (!FILE_OK.test(resume.name)) return fail("Your CV must be a PDF, DOC or DOCX file.");
  if (resume.size > MAX_BYTES) return fail("Your CV is larger than 4 MB. Please upload a smaller file.");

  const buffer = Buffer.from(await resume.arrayBuffer());
  const filename = safeName(resume.name);
  const subject = `Job application: ${position} — ${oneLine(name)}`;
  const body = [
    `Position: ${position}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Location: ${location || "-"}`,
    `Experience: ${experience}`,
    `Preferred workplace: ${workplace || "Any"}`,
    `LinkedIn: ${linkedin || "-"}`,
    `Portfolio / GitHub: ${portfolio || "-"}`,
    "",
    "Why a good fit:",
    message,
  ].join("\n");

  // 1) Email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const to = process.env.APPLICATIONS_TO_EMAIL;
    const from = process.env.APPLICATIONS_FROM_EMAIL || "CodeBeacon Careers <onboarding@resend.dev>";
    if (!to) {
      console.error("[apply] RESEND_API_KEY is set but APPLICATIONS_TO_EMAIL is missing");
      return fail("Applications are not set up yet. Please email us your CV instead.", 503);
    }
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          text: body,
          attachments: [{ filename, content: buffer.toString("base64") }],
        }),
      });
      if (!res.ok) {
        console.error("[apply] Resend error", res.status, await res.text().catch(() => ""));
        return fail("We could not send your application. Please try again in a minute.", 502);
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[apply] Resend request failed", err);
      return fail("We could not send your application. Please try again in a minute.", 502);
    }
  }

  // 2) Local development: save to ./applications
  if (process.env.NODE_ENV !== "production") {
    try {
      const dir = path.join(process.cwd(), "applications");
      await mkdir(dir, { recursive: true });
      const id = `${new Date().toISOString().replace(/[:.]/g, "-")}_${safeName(position).replace(/\s+/g, "-")}`;
      await writeFile(path.join(dir, `${id}.txt`), body, "utf8");
      await writeFile(path.join(dir, `${id}__${filename}`), buffer);
      console.log(`[apply] Saved application to applications/${id}.txt (dev mode, no RESEND_API_KEY set)`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[apply] Could not save locally", err);
      return fail("The application could not be saved.", 500);
    }
  }

  // 3) Production with nothing configured
  console.error("[apply] No delivery method configured. Set RESEND_API_KEY and APPLICATIONS_TO_EMAIL.");
  return fail("Applications are not set up yet. Please email us your CV instead.", 503);
}
