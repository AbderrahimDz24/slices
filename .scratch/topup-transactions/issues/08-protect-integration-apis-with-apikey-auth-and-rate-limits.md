# Protect Integration APIs With ApiKey Auth And Rate Limits

Status: done
Type: AFK

## What to build

Authenticate integration endpoints with `Authorization: ApiKey <key>` and attach the authenticated user and API key context to each request. Add Redis-backed Client Account rate limiting so integration APIs return `429` when the authenticated Client Account exceeds its shared request budget across Bearer and ApiKey credentials.

## Acceptance criteria

- [x] Integration endpoints can require ApiKey auth independently from existing JWT auth.
- [x] Active API keys authenticate and attach user/key context to the request.
- [x] Missing, invalid, or revoked API keys are rejected.
- [x] Rate limiting is enforced per Client Account using Redis.
- [x] Bearer and ApiKey requests for the same Client Account share one request budget.
- [x] Runtime Redis errors fail open and are logged.
- [x] Rate-limited requests return HTTP `429`.
- [x] Redis connection settings and local development requirements are documented.
- [x] Tests cover successful auth, invalid key rejection, revoked key rejection, user/key context, and rate-limit behavior.

## Blocked by

- `.scratch/topup-transactions/issues/05-expose-self-service-api-keys.md`
