# Monitoring And Logs

Status: ready-for-agent
Type: AFK

## What to build

Add basic operational visibility for the deployed API stack. The first monitoring pass should make uptime, container health, disk usage, API logs, worker status, and backup status easy to inspect.

## Acceptance criteria

- [ ] API container, worker process, Postgres, Redis, and reverse proxy health are visible.
- [ ] Application logs and proxy logs can be inspected without attaching to containers manually.
- [ ] Disk usage and database volume usage are monitored or documented with alert thresholds.
- [ ] Backup success or failure is visible.
- [ ] A simple uptime check monitors the public API endpoint.
- [ ] Operational runbook notes explain where to look during an incident.

## Blocked by

- `.scratch/topup-transactions/issues/15-deployment-pipeline.md`
- `.scratch/topup-transactions/issues/16-backups-and-restore-check.md`
