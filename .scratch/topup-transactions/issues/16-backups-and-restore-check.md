# Backups And Restore Check

Status: ready-for-agent
Type: AFK

## What to build

Add a backup and restore process for the single-VM deployment. The process should protect Postgres data and critical deployment configuration, and it must be tested by restoring into a disposable environment.

## Acceptance criteria

- [ ] Postgres backups run on a defined schedule and are stored outside the live database volume.
- [ ] Critical deployment configuration needed for recovery is included or separately documented.
- [ ] Backup retention is defined.
- [ ] Restore steps are documented.
- [ ] A restore into a disposable database or VM is performed successfully.
- [ ] Backup jobs expose enough logs or status output to detect failures.

## Blocked by

- `.scratch/topup-transactions/issues/02-hetzner-server-provisioning.md`
- `.scratch/topup-transactions/issues/07-production-environment-config.md`
