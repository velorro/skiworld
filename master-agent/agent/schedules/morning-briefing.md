---
cron: "0 14 * * 1-5"
---

Run Rick's weekday morning briefing (14:00 UTC ≈ 08:00 America/Denver).

Load the daily-briefing skill. Summarize calendar (today + tomorrow), Action inbox, Job Apps deltas, and Waiting On items older than 7 days. End with one recommended focus block. Do not send email. Persist any pipeline status changes you discover via update_job_pipeline (approval may be required).
