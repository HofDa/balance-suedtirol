"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";
import { withBasePath } from "@/lib/public-path";
import { focusRing } from "@/components/ui/focus";

interface ProjectGalleryProps {
  images: NonNullable<Project["gallery"]>;
  labels: { previous: string; next: string; image: string; of: string; photo: string };
}

export function ProjectGallery({ images, labels }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const slideId = useId();
  const item = images[index];
  if (!item) return null;
  const move = (offset: number) => setIndex((current) => (current + offset + images.length) % images.length);

  return (
    <div className="mt-8">
      <figure
        id={slideId}
        className={`rounded-[var(--radius-lg)] ${focusRing}`}
        tabIndex={images.length > 1 ? 0 : undefined}
        aria-label={`${labels.image} ${index + 1} ${labels.of} ${images.length}`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div
          className="relative aspect-[3/2] touch-pan-y overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-sage)] sm:aspect-[2/1]"
          onTouchStart={(event) => { touchStart.current = event.touches.length === 1 ? event.touches[0].clientX : null; }}
          onTouchEnd={(event) => {
            if (touchStart.current !== null && event.changedTouches.length > 0) {
              const distance = event.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(distance) > 50) move(distance > 0 ? -1 : 1);
            }
            touchStart.current = null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <Image src={withBasePath(item.src)} alt={item.alt} fill sizes="(min-width: 1280px) 1180px, 100vw" className="object-contain" />
        </div>
        <figcaption className="mt-3 w-full min-h-10 text-sm leading-6 text-[var(--color-muted)]" aria-live="polite" aria-atomic="true">
          {item.caption}
          {item.credit && <span> {item.caption ? "· " : ""}{labels.photo}: {item.credit}</span>}
        </figcaption>
      </figure>
      {images.length > 1 && (
        <>
          <div className="mt-4 flex items-center justify-center gap-5">
            <button type="button" onClick={() => move(-1)} aria-label={labels.previous} aria-controls={slideId} className={`grid size-11 place-items-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-forest)] transition hover:bg-[var(--color-sage)] ${focusRing}`}>
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <p className="text-sm tabular-nums text-[var(--color-muted)]" aria-live="polite" aria-atomic="true">{index + 1} {labels.of} {images.length}</p>
            <button type="button" onClick={() => move(1)} aria-label={labels.next} aria-controls={slideId} className={`grid size-11 place-items-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-forest)] transition hover:bg-[var(--color-sage)] ${focusRing}`}>
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
          <div className="mt-5 flex gap-3 overflow-x-auto p-1">
            {images.map((image, imageIndex) => (
              <button key={image.src} type="button" onClick={() => setIndex(imageIndex)} aria-label={`${labels.image} ${imageIndex + 1}: ${image.alt}`} aria-pressed={imageIndex === index} aria-controls={slideId} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border-2 transition ${imageIndex === index ? "border-[var(--color-forest)]" : "border-transparent opacity-60 hover:opacity-100"} ${focusRing}`}>
                <Image src={withBasePath(image.src)} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
