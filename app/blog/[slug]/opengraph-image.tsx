import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/posts";

export const alt = "CodeBeacon article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export default function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#050d18,#0B1F33 60%,#0F766E)", color: "#EEF3F5" }}>
        <div style={{ display: "flex", fontSize: 34, color: "#FFB020", fontWeight: 700 }}>{"< CodeBeacon >"}</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.12 }}>{post?.meta.title ?? "CodeBeacon"}</div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.8 }}>{post ? `${post.meta.category} interview prep · codebeacon.site` : "codebeacon.site"}</div>
      </div>
    ),
    size
  );
}
