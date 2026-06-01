# Protect Integration APIs With ApiKey Auth And Rate Limits

Status: ready-for-agent
Type: AFK

## What to build

Authenticate integration endpoints with `Authorization: ApiKey <key>` and attach the authenticated user and API key context to each request. Add Redis-backed per-key rate limiting so integration APIs can return `429` when a key exceeds its allowed request budget.

## Acceptance criteria

- [ ] Integration endpoints can require ApiKey auth independently from existing JWT auth.
- [ ] Active API keys authenticate and attach user/key context to the request.
- [ ] Missing, invalid, or revoked API keys are rejected.
- [ ] Rate limiting is enforced per API key using Redis.
- [ ] Rate-limited requests return HTTP `429`.
- [ ] Redis connection settings and local development requirements are documented.
- [ ] Tests cover successful auth, invalid key rejection, revoked key rejection, user/key context, and rate-limit behavior.

## Blocked by

- `.scratch/topup-transactions/issues/05-expose-self-service-api-keys.md`
