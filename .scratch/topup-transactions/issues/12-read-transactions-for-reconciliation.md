# Read Transactions For Reconciliation

Status: ready-for-agent
Type: AFK

## What to build

Expose mobile topup transaction reads for integration clients so they can reconcile platform transactions with their own systems. Reads must be scoped to the API-key user's account and backed by the generic transaction model.

## Acceptance criteria

- [ ] `GET /topups` lists mobile topup transactions for the authenticated API-key user.
- [ ] `GET /topups?externalId=...` returns the matching mobile topup transaction for the authenticated API-key user.
- [ ] `GET /topups/:transactionId` returns one mobile topup transaction for the authenticated API-key user.
- [ ] Topup transaction responses include status, amount, currency, MSISDN, product/offer reference, `externalId`, timestamps, and failure reason when present.
- [ ] A user cannot read another user's transactions by ID or `externalId`.
- [ ] Missing records return not found.
- [ ] Tests cover list, lookup by ID, lookup by `externalId`, not found, and account isolation.

## Blocked by

- `.scratch/topup-transactions/issues/11-create-pending-mobile-topup-transaction.md`
