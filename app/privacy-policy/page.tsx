import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = pageMeta({ title: "Privacy Policy", description: "How CodeBeacon handles data, cookies and advertising.", path: "/privacy-policy", image: "/images/banners/privacy.webp" });

export default function Privacy() {
  return (
    <>
      <PageHeader art="privacy" title="Privacy Policy" intro="Last updated: November 2026" />
      <div className="prose-post mx-auto px-6 py-16">
        <p>This policy explains what CodeBeacon (codebeacon.site) collects when you use the site, why, and what choices you have.</p>

        <h2>Information you send us</h2>
        <p>You do not need an account to read CodeBeacon. We only receive personal information that you choose to submit:</p>
        <ul>
          <li><strong>Contact form:</strong> your name, email address and message. We use them to reply to you.</li>
          <li><strong>Job applications:</strong> your name, email, phone number, location, experience, CV/resume, optional profile links and your message. We use them only to review your application and contact you about it. Applications are delivered to us by email through our email provider, Resend. We keep them only as long as needed for hiring purposes, and you can ask us to delete yours at any time.</li>
        </ul>
        <p>We do not sell this information.</p>

        <h2>Information collected automatically</h2>
        <p>Our servers and hosting provider (Vercel) may record standard technical data such as IP address, browser type, device type and the pages visited, for security, performance and analytics.</p>

        <h2>Cookies and analytics</h2>
        <p>We use Google Analytics to understand how visitors use the site and to improve it. Analytics cookies collect information such as pages viewed and approximate location. You can disable cookies in your browser settings or install the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">Google Analytics opt-out add-on</a>.</p>

        <h2>Advertising</h2>
        <p>CodeBeacon is supported by advertising. Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this and other websites.</p>
        <ul>
          <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the internet.</li>
          <li>You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>. You can learn more about how Google uses data from sites that use its services on <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">Google&apos;s Privacy &amp; Terms page</a>.</li>
          <li>Other advertising partners, such as Adsterra, may also place cookies or similar technologies to show and measure ads. To opt out of personalized ads from many third-party vendors, visit <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">aboutads.info/choices</a> or, in Europe, <a href="https://www.youronlinechoices.eu" rel="noopener noreferrer" target="_blank">youronlinechoices.eu</a>.</li>
          <li>If you are in the European Economic Area, the United Kingdom or Switzerland, you will be asked for your consent to cookies used for advertising, and you can change your choice at any time.</li>
        </ul>
        <p>Third-party vendors have their own privacy policies. We do not control their cookies.</p>

        <h2>Affiliate links</h2>
        <p>Some links may be affiliate links. If you buy through them we may earn a commission at no extra cost to you.</p>

        <h2>External links</h2>
        <p>The site links to other websites. We are not responsible for their content or privacy practices.</p>

        <h2>Your rights</h2>
        <p>You can ask us what personal information we hold about you, and ask us to correct or delete it, by writing to us from the <a href="/contact">Contact page</a>.</p>

        <h2>Children</h2>
        <p>CodeBeacon is not directed at children under 13 and we do not knowingly collect their data.</p>

        <h2>Changes</h2>
        <p>We may update this policy and will change the date above when we do.</p>

        <h2>Contact</h2>
        <p>Questions about this policy? Email us from the <a href="/contact">Contact page</a>.</p>
      </div>
    </>
  );
}
