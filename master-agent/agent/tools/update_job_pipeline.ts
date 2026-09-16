import { defineTool } from "eve/tools";
import { always } from "eve/tools/approval";
import { z } from "zod";
import { jobPipeline, slugId, type JobEntry } from "../lib/job-pipeline";

const entrySchema = z.object({
  id: z.string().min(1).optional(),
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.enum([
    "researching",
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
    "withdrawn",
    "on-hold",
  ]),
  priority: z.enum(["P0", "P1", "P2", "P3"]),
  appliedAt: z.string().optional(),
  lastTouchAt: z.string().optional(),
  nextAction: z.string().optional(),
  notes: z.string().optional(),
  sourceUrl: z.string().optional(),
});

export default defineTool({
  description:
    "Upsert one or more job pipeline rows in session state. Also remind the model to sync the Drive pipeline doc.",
  inputSchema: z.object({
    entries: z.array(entrySchema).min(1),
  }),
  approval: always(),
  label: {
    start: ({ entries }) => `Update ${entries.length} pipeline row(s)`,
  },
  async execute({ entries }) {
    const now = new Date().toISOString().slice(0, 10);
    let updated = 0;
    let created = 0;

    jobPipeline.update((state) => {
      const map = new Map(state.entries.map((e) => [e.id, e]));
      for (const incoming of entries) {
        const id = incoming.id ?? slugId(incoming.company, incoming.role);
        const prev = map.get(id);
        const next: JobEntry = {
          id,
          company: incoming.company,
          role: incoming.role,
          status: incoming.status,
          priority: incoming.priority,
          appliedAt: incoming.appliedAt ?? prev?.appliedAt ?? now,
          lastTouchAt: incoming.lastTouchAt ?? now,
          nextAction: incoming.nextAction ?? prev?.nextAction,
          notes: incoming.notes ?? prev?.notes,
          sourceUrl: incoming.sourceUrl ?? prev?.sourceUrl,
        };
        if (prev) updated += 1;
        else created += 1;
        map.set(id, next);
      }
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        entries: [...map.values()].sort((a, b) =>
          a.priority.localeCompare(b.priority),
        ),
      };
    });

    const pipeline = jobPipeline.get();
    return {
      created,
      updated,
      driveDocUrl: pipeline.driveDocUrl,
      reminder:
        "Sync the same changes into the Google Doc Master Agent — Job Pipeline.",
      entries: pipeline.entries,
    };
  },
});
