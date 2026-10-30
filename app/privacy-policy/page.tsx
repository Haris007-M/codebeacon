import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = pageMeta({ title: "Privacy Policy", description: "How CodeBeacon handles data, cookies and advertising.", path: "/privacy-policy", image: "/images/banners/privacy.webp" });

export default function Privacy() {
  return (
    <>
      <PageHeader art="privacy" title="Privacy Policy" intro="Last updated: October 2026" />
      <div className="prose-post mx-auto px-6 py-16">
        <h2>Information we collect</h2>
        <p>CodeBeacon does not require an account and does not collect names, emails or phone numbers through the site. Our servers and hosting provider may record standard technical data such as IP address, browser type and pages visited.</p>
        <h2>Cookies and analytics</h2>
        <p>We may use cookies and analytics tools to understand how visitors use the site and to improve it. You can disable cookies in your browser settings.</p>
        <h2>Advertising</h2>
        <p>Third-party vendors, including Google, may use cookies to serve ads based on your previous visits to this and other websites. You can opt out of personalized advertising at Google Ads Settings. Third-party vendors have their own privacy policies.</p>
        <h2>Affiliate links</h2>
        <p>Some links may be affiliate links. If you buy through them we may earn a commission at no extra cost to you.</p>
        <h2>External links</h2>
        <p>The site links to other websites. We are not responsible for their content or privacy practices.</p>
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
