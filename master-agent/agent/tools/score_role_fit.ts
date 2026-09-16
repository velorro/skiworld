import { defineTool } from "eve/tools";
import { z } from "zod";

const TARGET_KEYWORDS = [
  "customer success",
  "revenue operations",
  "revops",
  "sales operations",
  "sales ops",
  "customer experience",
  "cx",
  "gtm operations",
  "enablement",
];

const SENIORITY = ["vp", "vice president", "head of", "director", "chief"];

export default defineTool({
  description:
    "Score how well a role matches Rick's target profile (CS / RevOps / Sales Ops / CX leadership).",
  inputSchema: z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    notes: z.string().optional(),
    remoteFriendly: z.boolean().optional(),
  }),
  label: {
    start: ({ company, role }) => `Score fit: ${role} @ ${company}`,
  },
  async execute({ company, role, notes, remoteFriendly }) {
    const hay = `${role} ${notes ?? ""}`.toLowerCase();
    let score = 40;
    const reasons: string[] = [];

    for (const kw of TARGET_KEYWORDS) {
      if (hay.includes(kw)) {
        score += 12;
        reasons.push(`Matches focus area: ${kw}`);
        break;
      }
    }

    for (const s of SENIORITY) {
      if (hay.includes(s)) {
        score += 15;
        reasons.push(`Seniority signal: ${s}`);
        break;
      }
    }

    if (remoteFriendly) {
      score += 8;
      reasons.push("Remote-friendly");
    }

    if (hay.includes("account executive") || hay.includes("ae ")) {
      score -= 20;
      reasons.push("AE-heavy roles are usually off-target");
    }

    score = Math.max(0, Math.min(100, score));
    const priority =
      score >= 80 ? "P0" : score >= 65 ? "P1" : score >= 45 ? "P2" : "P3";

    return {
      company,
      role,
      score,
      suggestedPriority: priority,
      reasons,
      recommendation:
        score >= 65
          ? "Strong fit — prioritize application / follow-up."
          : score >= 45
            ? "Partial fit — apply only if leverage is clear."
            : "Weak fit — skip unless Rick has a specific reason.",
    };
  },
});
