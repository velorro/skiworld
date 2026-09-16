import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Inbox analyst that classifies threads into Rick's Gmail labels and proposes drafts without sending.",
  model: "anthropic/claude-sonnet-4.6",
  reasoning: "low",
});
