"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const OPEN_SUPPORT_EVENT = "balance:open-project-support";

export type ProjectSupportCopy = {
  close: string;
  support: string;
  thankYou: string;
  thankYouCopy: string;
  donation: string;
  sponsorship: string;
  volunteering: string;
  amount: string;
  volunteeringCopy: string;
  confirm: string;
};

const LazyProjectSupportDialog = dynamic(
  () => import("./project-support-dialog").then((module) => module.ProjectSupportDialog),
  { ssr: false }
);

export function ProjectSupportTrigger({
  label,
  variant = "primary",
  className
}: {
  label: string;
  variant?: "primary" | "accent";
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant={variant}
      onClick={() => window.dispatchEvent(new Event(OPEN_SUPPORT_EVENT))}
      className={className}
    >
      {label}
    </Button>
  );
}

export function ProjectSupportDialog({
  title,
  municipality,
  organization,
  copy
}: {
  title: string;
  municipality: string;
  organization: string;
  copy: ProjectSupportCopy;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsOpen(true);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener(OPEN_SUPPORT_EVENT, open);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener(OPEN_SUPPORT_EVENT, open);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <LazyProjectSupportDialog
      title={title}
      municipality={municipality}
      organization={organization}
      copy={copy}
      onClose={() => setIsOpen(false)}
    />
  );
}
