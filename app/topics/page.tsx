import { permanentRedirect } from "next/navigation";

// The Topics section was removed. Old links are sent to the blog, which now filters by topic.
export default function Topics() {
  permanentRedirect("/blog");
}
