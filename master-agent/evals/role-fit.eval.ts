import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

export default defineEval({
  description: "Role-fit scoring tool is used for job evaluation requests.",
  async test(t) {
    await t.send(
      "Score fit for VP of Customer Success at a B2B SaaS company that is remote-friendly.",
    );
    t.succeeded();
    t.calledTool("score_role_fit");
    t.check(t.reply, includes("fit"));
  },
});
