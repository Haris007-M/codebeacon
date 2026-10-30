import Image from "next/image";
import { artKey } from "@/components/Art";

export default function Cover({ category, className = "", priority = false }: { category: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`}>
      <Image
        src={`/images/covers/${artKey(category)}.webp`}
        alt={`${category} interview questions illustration`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </div>
  );
}
