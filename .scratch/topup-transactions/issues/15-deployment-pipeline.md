# Deployment Pipeline

Status: ready-for-human
Type: HITL

## What to build

Add a deployment pipeline that builds and tests the app, ships the production image or deployment bundle, and updates the Hetzner stack from the main branch. The pipeline must keep secrets out of the repository.

## Acceptance criteria

- [ ] The pipeline runs build and test checks before deployment.
- [ ] The pipeline can publish or transfer the production image/bundle to the Hetzner VM.
- [ ] The deployment step updates containers with minimal manual work.
- [ ] Required CI/CD secrets are documented and stored in the CI provider, not the repo.
- [ ] Rollback or redeploy of the previous known-good version is documented.
- [ ] A successful pipeline deploy is verified on the public API domain.

## Blocked by

- `.scratch/topup-transactions/issues/03-production-container-setup.md`
- `.scratch/topup-transactions/issues/02-hetzner-server-provisioning.md`
- `.scratch/topup-transactions/issues/07-production-environment-config.md`
- `.scratch/topup-transactions/issues/10-reverse-proxy-and-tls.md`
- `.scratch/topup-transactions/issues/09-cloudflare-domain-setup.md`
