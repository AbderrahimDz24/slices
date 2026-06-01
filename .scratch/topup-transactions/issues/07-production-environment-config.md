# Production Environment Config

Status: ready-for-human
Type: HITL

## What to build

Define and install the production environment configuration needed by the single-VM deployment. Secrets must be provided through server-side environment files or a deployment secret mechanism, not committed to the repository.

## Acceptance criteria

- [ ] A production environment template lists required variables for app port, Postgres, Redis, JWT, API keys, rate limits, provider sandbox mode, and public URLs.
- [ ] Real production secret values are stored only on the Hetzner server or in the deployment secret store.
- [ ] The deployment has distinct values for production/staging identity, issuer, audience, and public API base URL.
- [ ] The environment config supports running migrations and workers against the same production services.
- [ ] Secret rotation steps are documented for JWT secret and any future provider credentials.
- [ ] No real secret values are committed to git.

## Blocked by

- `.scratch/topup-transactions/issues/03-production-container-setup.md`
- `.scratch/topup-transactions/issues/02-hetzner-server-provisioning.md`
