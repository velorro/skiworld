import { defineTool } from "eve/tools";
import { z } from "zod";
import { jobPipeline } from "../lib/job-pipeline";

export default defineTool({
  description:
    "Read Rick's in-session job application pipeline (company, role, status, priority, next actions).",
  inputSchema: z.object({
    statusFilter: z
      .enum([
        "researching",
        "applied",
        "screening",
        "interview",
        "offer",
        "rejected",
        "withdrawn",
        "on-hold",
        "open",
      ])
      .optional()
      .describe("Filter by status. Use open for non-closed statuses."),
  }),
  label: {
    start: () => "Load job pipeline",
  },
  async execute({ statusFilter }) {
    const pipeline = jobPipeline.get();
    const closed = new Set(["rejected", "withdrawn"]);
    const entries = pipeline.entries.filter((e) => {
      if (!statusFilter) return true;
      if (statusFilter === "open") return !closed.has(e.status);
      return e.status === statusFilter;
    });
    return {
      updatedAt: pipeline.updatedAt,
      driveDocUrl: pipeline.driveDocUrl,
      count: entries.length,
      entries,
    };
  },
});
