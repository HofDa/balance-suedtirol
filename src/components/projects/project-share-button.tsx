"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { createProjectStoryImage } from "@/lib/project-story-image";
import { focusRing } from "@/components/ui/focus";

interface ShareCopy {
  shareProject: string;
  copyLink: string;
  linkCopied: string;
  copyFailed: string;
  instagramHelp: string;
  downloadStory: string;
  copyPost: string;
  postCopied: string;
  storyCallToAction: string;
  downloadFailed: string;
}

export function ProjectShareButton({ copy, title, description, image }: { copy: ShareCopy; title: string; description: string; image: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"copied" | "postCopied" | "failed" | "downloadFailed" | null>(null);
  const [instagramOpen, setInstagramOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [manualText, setManualText] = useState("");

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

  const copyLink = async (post = false) => {
    const text = post ? `${title}\n\n${description}\n\n${url}` : url;
    try {
      await navigator.clipboard.writeText(text);
      setStatus(post ? "postCopied" : "copied");
    } catch {
      setManualText(text);
      setStatus("failed");
    }
  };

  const downloadStory = async () => {
    setDownloading(true);
    setStatus(null);
    try {
      const blob = await createProjectStoryImage({ title, description, image, callToAction: copy.storyCallToAction });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `balance-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-instagram-story.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
    } catch {
      setStatus("downloadFailed");
    } finally {
      setDownloading(false);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const channels = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` }
  ];

  return (
    <div>
    <details ref={detailsRef} className="relative mt-3">
      <summary onClick={share} className={`flex min-h-11 cursor-pointer list-none items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-forest)]/30 bg-white px-4 py-3 text-sm font-bold text-[var(--color-forest)] transition hover:bg-[var(--color-sage)] [&::-webkit-details-marker]:hidden ${focusRing}`}>
        <Share2 className="size-4" aria-hidden />
        {copy.shareProject}
      </summary>
      <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-[var(--radius-lg)] border border-[var(--color-line)] max-h-[65dvh] overflow-y-auto bg-white p-2 shadow-lg">
        {channels.map((channel) => (
          <a key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer" className={`flex min-h-11 items-center rounded-[var(--radius-sm)] px-3 text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-sage)] ${focusRing}`}>
            {channel.label}
          </a>
        ))}
        <button type="button" onClick={() => copyLink()} className={`flex min-h-11 w-full items-center gap-2 rounded-[var(--radius-sm)] px-3 text-left text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-sage)] ${focusRing}`}>
          {status === "copied" ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          {copy.copyLink}
        </button>
        <button type="button" onClick={() => { setInstagramOpen((open) => !open); setStatus(null); }} aria-expanded={instagramOpen} className={`flex min-h-11 w-full items-center rounded-[var(--radius-sm)] px-3 text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-sage)] ${focusRing}`}>
          Instagram
        </button>
        {instagramOpen && (
          <div className="my-2 rounded-[var(--radius-sm)] bg-[var(--color-sage)]/40 p-3">
            <p className="text-xs leading-5 text-[var(--color-muted)]">{copy.instagramHelp}</p>
            <button type="button" onClick={downloadStory} disabled={downloading} className={`mt-2 min-h-11 w-full rounded border border-[var(--color-forest)]/30 px-3 text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-sage)] disabled:cursor-wait disabled:opacity-50 ${focusRing}`}>{copy.downloadStory}</button>
            <button type="button" onClick={() => copyLink(true)} className={`mt-2 min-h-11 w-full rounded border border-[var(--color-forest)]/30 px-3 text-sm font-semibold text-[var(--color-forest)] hover:bg-[var(--color-sage)] ${focusRing}`}>{copy.copyPost}</button>
          </div>
        )}
        <p role="status" className="px-3 text-xs leading-5 text-[var(--color-muted)]">
          {status === "copied" ? copy.linkCopied : status === "postCopied" ? copy.postCopied : status === "failed" ? copy.copyFailed : status === "downloadFailed" ? copy.downloadFailed : ""}
        </p>
        {status === "failed" && <input ref={inputRef} readOnly value={manualText} aria-label={copy.copyLink} className={`mt-2 w-full rounded border border-[var(--color-line)] p-2 text-xs ${focusRing}`} />}
      </div>
    </details>
    <button type="button" onClick={() => { setInstagramOpen(true); setStatus(null); if (detailsRef.current) detailsRef.current.open = true; }} aria-label={copy.downloadStory} className={`mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-[var(--color-forest)] underline underline-offset-4 hover:text-[var(--color-ink)] ${focusRing}`}>
      Instagram Story
    </button>
    </div>
  );
}
