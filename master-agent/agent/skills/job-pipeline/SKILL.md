---
description: Manage Rick's job search pipeline — applications, follow-ups, interview prep, role fit scoring, and pipeline doc updates.
---

# Job pipeline

## Source of truth

Google Doc: [Master Agent — Job Pipeline](https://docs.google.com/document/d/11IiJaq5snu1gjyIaHZPm14rob3n99GSw-nQckY0F0pI/edit)

Also keep session state via `get_job_pipeline` / `update_job_pipeline` tools so the agent stays consistent mid-session.

## Target profile

Director / VP in Customer Success, RevOps, Sales Ops, Customer Experience. Remote or Denver-compatible preferred. Score fit with `score_role_fit`.

## When new job mail arrives

1. Label `Job Apps`.
2. Upsert pipeline row (company, role, status, priority, dates, next action).
3. If confirmation only → Priority P2 unless title is VP+ CS/RevOps (then P1).
4. If interview / screen → P0 and calendar prep.
5. If rejection → move to closed; short empathy note optional; no lengthy post-mortem unless asked.

## Follow-ups

- Applied with no reply > 10 business days → draft polite bump (do not send).
- After recruiter screen → log notes + thank-you draft within 24h.

## Interview prep

Load `interview-prep` when a live interview is scheduled.
