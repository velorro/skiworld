import { defineState } from "eve/context";

export type JobStatus =
  | "researching"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn"
  | "on-hold";

export type JobPriority = "P0" | "P1" | "P2" | "P3";

export type JobEntry = {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  priority: JobPriority;
  appliedAt?: string;
  lastTouchAt?: string;
  nextAction?: string;
  notes?: string;
  sourceUrl?: string;
};

export type JobPipeline = {
  updatedAt: string;
  driveDocUrl: string;
  entries: JobEntry[];
};

const DRIVE_DOC =
  "https://docs.google.com/document/d/11IiJaq5snu1gjyIaHZPm14rob3n99GSw-nQckY0F0pI/edit";

const seed: JobEntry[] = [
  {
    id: "m3-vp-cs",
    company: "M3",
    role: "VP, Customer Success",
    status: "applied",
    priority: "P1",
    appliedAt: "2026-09-15",
    lastTouchAt: "2026-09-15",
    nextAction: "Watch for recruiter reply",
  },
  {
    id: "commure-head-revops",
    company: "Commure",
    role: "Head of Revenue Operations",
    status: "applied",
    priority: "P1",
    appliedAt: "2026-09-15",
    lastTouchAt: "2026-09-15",
    nextAction: "Await Ashby review",
  },
  {
    id: "zus-vp-cs",
    company: "Zus",
    role: "VP, Customer Success",
    status: "applied",
    priority: "P1",
    appliedAt: "2026-09-11",
    lastTouchAt: "2026-09-11",
    nextAction: "Await team review",
  },
  {
    id: "workiva-vp-cx",
    company: "Workiva",
    role: "VP of Customer Experience",
    status: "applied",
    priority: "P1",
    appliedAt: "2026-09-09",
    lastTouchAt: "2026-09-09",
    nextAction: "Await review",
  },
];

export const jobPipeline = defineState<JobPipeline>(
  "master-agent.job-pipeline",
  () => ({
    updatedAt: new Date().toISOString(),
    driveDocUrl: DRIVE_DOC,
    entries: seed,
  }),
);

export function slugId(company: string, role: string): string {
  return `${company}-${role}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}
