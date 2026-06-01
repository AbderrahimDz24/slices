# Production Container Setup

Status: ready-for-agent
Type: AFK

## What to build

Prepare the application to run as a production container stack on a single Hetzner VM. The stack should include the API, Postgres, Redis, and a clear migration command path without relying on development-only settings.

This can start before all product features are complete. The production stack should be flexible enough to run the current app and later include the Redis-backed rate limiter and transaction worker.

## Acceptance criteria

- [ ] The production Docker setup builds the NestJS API image from a clean checkout.
- [ ] The production compose setup includes API, Postgres, Redis, persistent volumes, health checks, and restart policies.
- [ ] Runtime configuration is read from environment variables rather than hard-coded development values.
- [ ] The app can run migrations against the production Postgres container.
- [ ] The setup documents how to build, start, stop, inspect logs, and run migrations.
- [ ] Local validation proves the production container stack can boot successfully.

## Blocked by

None - can start immediately.
