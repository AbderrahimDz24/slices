# Read Transactions For Reconciliation

Status: ready-for-agent
Type: AFK

## What to build

Expose transaction reads for integration clients so they can reconcile platform transactions with their own systems. Reads must be scoped to the API-key user's account.

## Acceptance criteria

- [ ] `GET /transactions` lists transactions for the authenticated API-key user.
- [ ] `GET /transactions?external_id=...` returns the matching transaction for the authenticated API-key user.
- [ ] `GET /transactions/:transaction_id` returns one transaction for the authenticated API-key user.
- [ ] Transaction responses include status, amount, currency, MSISDN, product/offer reference, `external_id`, timestamps, and failure reason when present.
- [ ] A user cannot read another user's transactions by ID or `external_id`.
- [ ] Missing records return not found.
- [ ] Tests cover list, lookup by ID, lookup by `external_id`, not found, and account isolation.

## Blocked by

- `.scratch/topup-transactions/issues/11-create-pending-mobile-topup-transaction.md`
