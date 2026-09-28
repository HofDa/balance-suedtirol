import type { ReactNode } from "react";
import type { ServiceId } from "@/config/home-story";

/**
 * Line-Art zu den sechs Ökosystemleistungen. Eine Strichstärke, eine Farbe
 * (Bergwald über `currentColor`), dazu eine Almmoos-Fläche als ruhiger Grund –
 * Zeichnung statt Icon, damit die Reihe nicht wie ein Icon-Raster wirkt.
 */
const moss = "var(--color-moss)";

const drawings: Record<ServiceId, ReactNode> = {
  pollination: (
    <>
      <circle cx="46" cy="54" r="30" fill={moss} opacity="0.45" stroke="none" />
      <path d="M34 90V56" />
      <path d="M34 76c-9-1-13-6-13-13 8 0 13 5 13 13Z" />
      <path d="M34 69c8-1 12-6 12-12-8 0-12 5-12 12Z" />
      <circle cx="34" cy="41" r="5.5" />
      <circle cx="41.2" cy="46.2" r="5.5" />
      <circle cx="38.5" cy="54.6" r="5.5" />
      <circle cx="29.5" cy="54.6" r="5.5" />
      <circle cx="26.8" cy="46.2" r="5.5" />
      <circle cx="34" cy="48.5" r="3" fill="currentColor" />
      <path d="M44 40c6-3 10-6 14-10" strokeDasharray="2 4" />
      <ellipse cx="66" cy="25" rx="8" ry="5.5" transform="rotate(-25 66 25)" />
      <path d="M63 21.5l2.5 7M67.5 19.5l2.5 7" />
      <path d="M64 20c-3-7 1-11 5-9 2 2 0 6-3 9M69 18c1-7 6-9 9-6 1 3-3 6-7 7" />
      <path d="M73.5 21.5l4-2" />
    </>
  ),
  water: (
    <>
      <path d="M8 44c13-5 27-5 40 0s27 5 40 0v44H8Z" fill={moss} opacity="0.45" stroke="none" />
      <path d="M28 8c3.5 4.5 5 7 5 9.5a5 5 0 0 1-10 0c0-2.5 1.5-5 5-9.5Z" />
      <path d="M50 16c3.5 4.5 5 7 5 9.5a5 5 0 0 1-10 0c0-2.5 1.5-5 5-9.5Z" />
      <path d="M71 6c3.5 4.5 5 7 5 9.5a5 5 0 0 1-10 0c0-2.5 1.5-5 5-9.5Z" />
      <path d="M8 44c13-5 27-5 40 0s27 5 40 0" />
      <path d="M18 42v-6M21 41l2-5M15 41l-2-5M68 43v-6M71 42l2-5M65 42l-2-5" />
      <path d="M28 50v8M50 51v10M71 50v8" strokeDasharray="2 3" />
      <path d="M14 68c6-3 11-3 17 0s11 3 17 0 11-3 17 0 11 3 17 0" />
      <path d="M14 78c6-3 11-3 17 0s11 3 17 0 11-3 17 0 11 3 17 0" />
    </>
  ),
  cooling: (
    <>
      <ellipse cx="42" cy="85" rx="28" ry="5" fill={moss} opacity="0.6" stroke="none" />
      <circle cx="74" cy="20" r="8" />
      <path d="M74 5v4M74 31v4M59 20h4M85 20h4M63.4 9.4l2.8 2.8M81.8 27.8l2.8 2.8M84.6 9.4l-2.8 2.8" />
      <path d="M42 60c-13 0-20-8-20-17 0-7 4.5-12 10-13 1.5-8 9-13 16.5-11.5 7-5 17.5-2 19.5 6.5 6 2.5 8.5 9 6.5 15-2 7-8.5 11-15 11Z" fill={moss} fillOpacity="0.45" />
      <path d="M44 86V58M44 70l-7-7M44 66l6-6" />
      <path d="M72 50v18a4.5 4.5 0 1 0 5 0V50a2.5 2.5 0 0 0-5 0Z" />
      <path d="M74.5 58v12" strokeWidth="2.5" />
    </>
  ),
  soil: (
    <>
      <path d="M8 40h80v48H8Z" fill={moss} opacity="0.45" stroke="none" />
      <path d="M8 40h80" />
      <path d="M48 40V26" />
      <path d="M48 30c-7 0-10-4.5-10-9.5 6 0 10 4 10 9.5ZM48 27c6 0 9.5-4 9.5-8.5-6 0-9.5 3.5-9.5 8.5Z" />
      <path d="M48 40v10M48 46l-6 7M48 46l6 8M42 53l-3 5M54 54l2 5" />
      <path d="M16 72c5-7 11-7 16 0s11 7 16 0 11-7 16 0" strokeWidth="3.5" />
      <circle cx="68" cy="72" r="1" fill="currentColor" />
      <circle cx="22" cy="52" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="31" cy="58" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="70" cy="52" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="78" cy="60" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="26" cy="83" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="58" cy="84" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="80" cy="80" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  carbon: (
    <>
      <path d="M8 72h80v16H8Z" fill={moss} opacity="0.45" stroke="none" />
      <text x="10" y="18" fill="currentColor" stroke="none" fontSize="10" fontWeight="600" fontFamily="inherit">
        CO₂
      </text>
      <path d="M22 24c4 10 12 16 22 18" strokeDasharray="2 4" />
      <path d="M40 38l5 4-6 2" />
      <path d="M60 14 47 33h7L43 48h8L41 61h38L69 48h8L66 33h7Z" fill={moss} fillOpacity="0.45" />
      <path d="M60 61v11" />
      <path d="M8 72h80" />
      <path d="M60 72v8M60 76l-7 6M60 76l7 7" />
      <path d="M14 80h10M30 84h8M74 82h10" strokeDasharray="1 3" />
    </>
  ),
  erosion: (
    <>
      <path d="M8 26 88 74v14H8Z" fill={moss} opacity="0.45" stroke="none" />
      <path d="M8 26 88 74" />
      <path d="M22 34v-9M22 34l-4-7M22 34l4-8" />
      <path d="M22 34v8M22 38l-5 5M22 38l4 6" />
      <path d="M42 46V35M42 46l-5-8M42 46l5-9" />
      <path d="M42 46v9M42 50l-6 5M42 50l5 7M36 55l-2 4" />
      <path d="M62 58c-7 0-10-5-10-10 0-6 5-9 10-9s10 3 10 9c0 5-3 10-10 10Z" fill={moss} fillOpacity="0.45" />
      <path d="M62 58v6M62 64l-6 7M62 64l6 8M62 64v9" />
      <path d="M50 8l-3 7M62 6l-3 7M74 10l-3 7" />
    </>
  )
};

export function ServiceIllustration({ id, className }: { id: ServiceId; className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {drawings[id]}
    </svg>
  );
}
