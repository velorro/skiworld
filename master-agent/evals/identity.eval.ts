import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Master Agent identifies itself and offers chief-of-staff help.",
  async test(t) {
    await t.send("Who are you and what can you help me with today?");
    t.succeeded();
    t.check(t.reply, includes("Master Agent"));
  },
});
