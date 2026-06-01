# Standardize Integration Errors And Request IDs

Status: ready-for-agent
Type: AFK

## What to build

Normalize integration API errors to the v1 contract shape so clients can handle failures consistently across authentication, validation, balance, duplicate, rate-limit, and not-found scenarios.

## Acceptance criteria

- [ ] Integration API errors use `{ "error": { "code": "...", "message": "...", "request_id": "..." } }`.
- [ ] Each request has a request ID available to error responses and logs.
- [ ] Invalid amount, invalid MSISDN, invalid `external_id`, insufficient balance, duplicate `external_id`, unauthorized, not found, and rate-limited paths map to stable error codes.
- [ ] Error responses avoid leaking API key secrets or unrelated account information.
- [ ] Tests cover representative error responses and request ID presence.

## Blocked by

- `.scratch/topup-transactions/issues/08-protect-integration-apis-with-apikey-auth-and-rate-limits.md`
- `.scratch/topup-transactions/issues/11-create-pending-mobile-topup-transaction.md`
- `.scratch/topup-transactions/issues/12-read-transactions-for-reconciliation.md`
- `.scratch/topup-transactions/issues/13-finalize-transactions-through-sandbox-provider.md`
