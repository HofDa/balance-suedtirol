/** Small, cancellable numeric tween shared by counters and image comparisons. */
export function animateNumber({
  from,
  to,
  duration,
  delay = 0,
  onUpdate
}: {
  from: number;
  to: number;
  duration: number;
  delay?: number;
  onUpdate: (value: number) => void;
}) {
  let frame = 0;
  let cancelled = false;
  const timer = window.setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const progress = Math.min(1, (now - start) / duration);
      onUpdate(from + (to - from) * (1 - (1 - progress) ** 4));
      if (progress < 1 && !cancelled) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }, delay);

  return () => {
    cancelled = true;
    window.clearTimeout(timer);
    cancelAnimationFrame(frame);
  };
}
