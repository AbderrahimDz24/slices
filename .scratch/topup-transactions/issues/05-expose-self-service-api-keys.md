# Expose Self-Service API Keys

Status: ready-for-agent
Type: AFK

## What to build

Let signed-in users create, list, and revoke multiple API keys for integration access. API keys are user-owned credentials, separate from JWT login tokens, and revoked keys must stop authenticating.

## Acceptance criteria

- [ ] A signed-in user can create a named API key.
- [ ] The raw API key is returned only once at creation time.
- [ ] Stored API keys are hashed at rest and cannot be recovered from list responses.
- [ ] A signed-in user can list only their own API key metadata.
- [ ] A signed-in user can revoke only their own API keys.
- [ ] Revoked keys are clearly represented in metadata and excluded from active use.
- [ ] Tests cover creation, listing, revocation, ownership isolation, and hashed storage behavior.

## Blocked by

- `.scratch/topup-transactions/issues/01-lock-topup-domain-language.md`
