import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "CodeBeacon", short_name: "CodeBeacon", description: "Frontend interview questions and answers", start_url: "/", display: "standalone", background_color: "#EEF3F5", theme_color: "#0B1F33", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/logo.png", sizes: "512x512", type: "image/png", purpose: "any" }] };
}
