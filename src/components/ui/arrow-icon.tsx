import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Der Pfeil am Ende von Links und Schaltflächen. Er rückt nach rechts, sobald
 * das umgebende Element (`group`) berührt wird. Rein dekorativ.
 */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <ArrowRight
      className={cn(
        "size-4 transition-transform duration-300 group-hover:translate-x-1",
        className
      )}
      aria-hidden
    />
  );
}
