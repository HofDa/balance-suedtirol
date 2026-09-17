"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { focusRing } from "@/components/ui/focus";

interface ShareCopy {
  shareProject: string;
  copyLink: string;
  linkCopied: string;
  copyFailed: string;
}

export function ProjectShareButton({ copy, title, description }: { copy: ShareCopy; title: string; description: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"copied" | "failed" | null>(null);

  useEffect(() => {
    const pageUrl = new URL(window.location.href);
    pageUrl.search = "";
    pageUrl.hash = "";
    setUrl(pageUrl.href);
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !detailsRef.current?.contains(event.target) && detailsRef.current) detailsRef.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.open = false;
        detailsRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    if (status === "failed") inputRef.current?.select();
  }, [status]);

  const share = async (event: React.MouseEvent<HTMLElement>) => {
    setStatus(null);
    if (!navigator.share || !window.matchMedia("(pointer: coarse)").matches) return;
    event.preventDefault();
    try {
      await navigator.share({ title, text: description, url });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (detailsRef.current) detailsRef.current.open = true;
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const channels = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` }
  ];

  return (
    <details ref={detailsRef} className="relative mt-3">
      <summary onClick={share} className={`flex min-h-11 cursor-pointer list-none items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-forest)]/30 bg-white px-4 py-3 text-sm font-bold text-[var(--color-forest)] transition hover:bg-[var(--color-sage)] [&::-webkit-details-marker]:hidden ${focusRing}`}>
        <Share2 className="size-4" aria-hidden />
        {copy.shareProject}
      </summary>
      <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white p-2 shadow-lg">
        {channels.map((channel) => (
          <a key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer" className={`flex min-h-11 items-center rounded-[var(--radius-sm)] px-3 text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-sage)] ${focusRing}`}>
            {channel.label}
          </a>
        ))}
        <button type="button" onClick={copyLink} className={`flex min-h-11 w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 text-left text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-sage)] ${focusRing}`}>
          {status === "copied" ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          {copy.copyLink}
        </button>
        <p role="status" className="px-3 text-xs leading-5 text-[var(--color-muted)]">
          {status === "copied" ? copy.linkCopied : status === "failed" ? copy.copyFailed : ""}
        </p>
        {status === "failed" && <input ref={inputRef} readOnly value={url} aria-label={copy.copyLink} className={`mt-2 w-full rounded border border-[var(--color-line)] p-2 text-xs ${focusRing}`} />}
      </div>
    </details>
  );
}
