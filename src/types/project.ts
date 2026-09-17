import type { ProjectCategoryId } from "../config/project-categories";

export type Sponsor = {
  name: string;
  /** Approved logo asset in /public. Falls back to a text wordmark when absent. */
  logo?: string;
  website?: string;
  /** Short, factual description of what the sponsor enables. */
  contribution?: string;
  /** Makes prototype sponsorship visibly distinguishable from real funding. */
  isPlaceholder?: boolean;
};

export type ProjectStatus = "support-needed" | "in-progress" | "monitoring" | "completed";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** The first habitat is the project's primary visual category. */
  categoryIds: ProjectCategoryId[];
  status: ProjectStatus;
  municipality: string;
  organization: string;
  location: { lat: number; lng: number };
  image: string;
  /**
   * Fotopaar vom selben Standpunkt, vor und nach der Maßnahme. Fehlt es,
   * zeigt die Projektseite keinen Vorher/Nachher-Vergleich.
   */
  beforeAfter?: {
    before: string;
    after: string;
    /** Beschriftung der Bildhälften, z. B. Aufnahmedaten; Fallback ist „Vorher“/„Nachher“. */
    beforeLabel?: string;
    afterLabel?: string;
    caption?: string;
    /**
     * Kennzeichnet ein bearbeitetes Platzhalterpaar statt echter Vorher-Fotos.
     * Solche Paare zeigt die Projektseite nicht; sie behält das Einzelbild als Hero.
     */
    isPlaceholder?: boolean;
  };
  /** Weitere Aufnahmen aus dem Projektgebiet; `credit` nur, wo eine Namensnennung gewünscht ist. */
  gallery?: Array<{ src: string; alt: string; caption?: string; credit?: string }>;
  /** Fehlt, solange das Finanzierungsziel nicht entschieden ist. */
  goal?: number;
  funded?: number;
  supporters: number;
  whyItMatters: string;
  impact: Array<{ value: string; label: string; description?: string }>;
  monitoring: {
    species: string;
    surveys: string;
    reporting: string;
    summary: string;
  };
  mainSponsor?: Sponsor;
  otherSponsors?: Sponsor[];
};

export type ProjectCardData = Pick<
  Project,
  | "slug"
  | "title"
  | "summary"
  | "categoryIds"
  | "status"
  | "municipality"
  | "organization"
  | "image"
  | "mainSponsor"
> & { additionalSponsorCount: number };

export type ProjectListItem = ProjectCardData & Pick<Project, "goal" | "funded">;
