# Master Agent

Rick Rios's durable chief-of-staff on [eve](https://eve.dev) — inbox triage, calendar, job pipeline, interview prep, and research.

## What leveled up

- **Identity** tailored to Ricardo Rios (Denver, CS/RevOps/Sales Ops leadership search)
- **Skills**: daily briefing, inbox triage, job pipeline, interview prep, calendar ops
- **Tools**: `get_job_pipeline`, `update_job_pipeline` (approval-gated), `score_role_fit`
- **Subagents**: `researcher`, `inbox-analyst`
- **Schedules**: weekday morning briefing + afternoon pipeline sweep (UTC crons mapped to America/Denver)
- **Drive source of truth**: [Master Agent — Job Pipeline](https://docs.google.com/document/d/11IiJaq5snu1gjyIaHZPm14rob3n99GSw-nQckY0F0pI/edit)
- **Gmail**: `Master Agent` label created; Job Apps labeling enforced in skills

## Run locally

Requires Node.js 24+:

```bash
cd master-agent
npm install
npm exec -- eve dev
```

Web chat UI:

```bash
npm run dev
```

## Deploy

```bash
npm exec -- eve deploy --non-interactive --yes
```

Connect Google Workspace / Slack / etc. via Vercel Connect after deploy so the agent can act on live mail and calendar outside Cursor.

## Safety

Outbound email, social posts, deletes, and pipeline mutations that write session state require human approval (`update_job_pipeline` uses `always()`).
