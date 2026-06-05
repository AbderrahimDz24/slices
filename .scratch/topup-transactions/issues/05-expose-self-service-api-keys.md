# Expose Self-Service API Keys

Status: done
Type: AFK

## What to build

Let signed-in users create, list, and revoke multiple API keys for integration access. API keys are user-owned credentials, separate from JWT login tokens, and revoked keys must stop authenticating.

## Acceptance criteria

- [x] A signed-in user can create a named API key.
- [x] The raw API key is returned only once at creation time.
- [x] Stored API keys are hashed at rest and cannot be recovered from list responses.
- [x] A signed-in user can list only their own API key metadata.
- [x] A signed-in user can revoke only their own API keys.
- [x] Revoked keys are clearly represented in metadata and excluded from active use.
- [x] Tests cover creation, listing, revocation, ownership isolation, and hashed storage behavior.

## Blocked by

- `.scratch/topup-transactions/issues/01-lock-topup-domain-language.md`
