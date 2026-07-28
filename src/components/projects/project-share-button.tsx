"use client";

import { Share2 } from "lucide-react";
import { focusRing } from "@/components/ui/focus";

export function ProjectShareButton({ label, title }: { label: string; title: string }) {
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button
      type="button"
      onClick={share}
      className={`inline-flex min-h-11 items-center gap-1 underline hover:text-[var(--color-ink)] ${focusRing}`}
    >
      <Share2 className="size-3" aria-hidden />
      {label}
    </button>
  );
}
