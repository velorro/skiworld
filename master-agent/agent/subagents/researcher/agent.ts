import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Deep research specialist for companies, roles, competitors, and interview context. Returns tight briefs with sources.",
  model: "anthropic/claude-sonnet-4.6",
  reasoning: "medium",
});
