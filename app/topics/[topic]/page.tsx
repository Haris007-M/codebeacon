import { permanentRedirect } from "next/navigation";

// The Topics section was removed. Old topic links go to the blog filtered by that topic.
export default function Topic({ params }: { params: { topic: string } }) {
  permanentRedirect(`/blog?topic=${encodeURIComponent(params.topic)}`);
}
