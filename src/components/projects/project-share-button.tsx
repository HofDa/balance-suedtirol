"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Share2, X, Download, ArrowUpRight, Loader2 } from "lucide-react";
import { createProjectStoryImage } from "@/lib/project-story-image";
import Image from "next/image";
import { withBasePath } from "@/lib/public-path";
import { focusRing } from "@/components/ui/focus";

interface ShareCopy {
  shareProject: string;
  close: string;
  shareOptions: string;
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [nativeShare, setNativeShare] = useState(false);
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
    setNativeShare(typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const trigger = triggerRef.current;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (status === "failed") inputRef.current?.select();
  }, [status]);

  const share = async () => {
    try { await navigator.share({ title, text: description, url }); }
    catch { /* Keep the options available after cancellation. */ }
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
    } catch { setStatus("downloadFailed"); }
    finally { setDownloading(false); }
  };

  const encodedUrl = encodeURIComponent(url);
  const channels = [
    { label: "WhatsApp", logo: "whatsapp.svg", href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
    { label: "Facebook", logo: "facebook.png", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "LinkedIn", logo: null, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` }
  ];

    const tileClass = `group flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white px-3 py-4 text-sm font-semibold text-[var(--color-forest)] transition hover:-translate-y-0.5 hover:border-[var(--color-forest)]/40 hover:bg-[var(--color-sage)]/30 hover:shadow-sm ${focusRing}`;

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => { setOpen(true); setStatus(null); setInstagramOpen(false); }} className={`mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-forest)]/30 bg-white px-4 py-3 text-sm font-bold text-[var(--color-forest)] transition hover:bg-[var(--color-sage)] hover:shadow-sm ${focusRing}`}>
        <Share2 className="size-4" aria-hidden />{copy.shareProject}
      </button>
      <dialog ref={dialogRef} aria-labelledby="project-share-title" onCancel={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }} className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[90dvh] w-full max-w-none overflow-y-auto rounded-t-3xl border-0 bg-white p-0 text-[var(--color-forest)] shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm sm:inset-0 sm:m-auto sm:max-w-lg sm:rounded-3xl">
        <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 id="project-share-title" className="text-xl font-bold">{copy.shareProject}</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label={copy.close} className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)]/40 transition hover:bg-[var(--color-sage)] ${focusRing}`}><X className="size-5" aria-hidden /></button>
          </div>
          <div className="mb-5 flex items-center gap-4 rounded-2xl bg-[var(--color-sage)]/30 p-3">
            <Image src={image} alt="" width={72} height={72} className="size-[72px] shrink-0 rounded-xl object-cover" />
            <div className="min-w-0"><p className="font-bold">{title}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--color-muted)]">{description}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {channels.map((channel) => <a key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer" className={tileClass}>
              {channel.logo ? <Image src={withBasePath(`/brands/${channel.logo}`)} width={32} height={32} alt="" className="size-8 object-contain" /> : <ArrowUpRight className="size-8" aria-hidden />}
              {channel.label}
            </a>)}
            <button type="button" onClick={() => { setInstagramOpen(!instagramOpen); setStatus(null); }} aria-expanded={instagramOpen} aria-controls="instagram-share-options" className={`${tileClass} ${instagramOpen ? "border-[var(--color-forest)]/50 bg-[var(--color-sage)]/40" : ""}`}><Image src={withBasePath("/brands/instagram.svg")} width={32} height={32} alt="" className="size-8" />Instagram</button>
          </div>
          {instagramOpen && <div id="instagram-share-options" className="mt-5 rounded-2xl bg-[var(--color-sage)]/30 p-4">
            <p className="mb-2 text-sm font-bold">Instagram Story</p>
            <p className="text-xs leading-5 text-[var(--color-muted)]">{copy.instagramHelp}</p>
            <button type="button" onClick={downloadStory} disabled={downloading} aria-busy={downloading} className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-3 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60 ${focusRing}`}>{downloading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Download className="size-4" aria-hidden />}{copy.downloadStory}</button>
            <button type="button" onClick={() => copyLink(true)} className={`mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-forest)]/20 px-3 py-2 text-sm font-semibold transition hover:bg-[var(--color-sage)] ${focusRing}`}><Copy className="size-4" aria-hidden />{copy.copyPost}</button>
          </div>}
          <div className="mt-5 flex min-w-0 items-center gap-2 rounded-xl border border-[var(--color-line)] bg-[var(--color-sage)]/15 p-2">
            <span className="min-w-0 flex-1 truncate pl-2 text-xs text-[var(--color-muted)]" title={url}>{url.replace(/^https?:\/\//, "")}</span>
            <button type="button" onClick={() => copyLink()} className={`flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-white px-3 text-xs font-bold shadow-sm transition hover:bg-[var(--color-sage)] ${focusRing}`}>{status === "copied" ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}{copy.copyLink}</button>
          </div>
          {nativeShare && <button type="button" onClick={share} className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition hover:bg-[var(--color-sage)]/40 ${focusRing}`}><Share2 className="size-4" aria-hidden />{copy.shareOptions}</button>}
          <p role="status" className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{status === "copied" ? copy.linkCopied : status === "postCopied" ? copy.postCopied : status === "failed" ? copy.copyFailed : status === "downloadFailed" ? copy.downloadFailed : ""}</p>
          {status === "failed" && <input ref={inputRef} readOnly value={manualText} aria-label={copy.copyLink} className={`mt-2 w-full rounded-xl border border-[var(--color-line)] p-3 text-xs ${focusRing}`} />}
        </div>
      </dialog>
    </>
  );
}
