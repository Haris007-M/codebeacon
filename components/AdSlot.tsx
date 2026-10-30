// Placeholder for an ad unit. After AdSense approval, replace the inner div with your <ins class="adsbygoogle"> code.
export default function AdSlot({ label = "Advertisement" }: { label?: string }) {
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SHOW_AD_SLOTS) return null;
  return (
    <div className="my-10 flex h-28 items-center justify-center rounded-xl border border-dashed border-mist text-sm text-ink/40" aria-label={label}>
      Ad slot
    </div>
  );
}
