# Create Pending Mobile Topup Transaction

Status: ready-for-agent
Type: AFK

## What to build

Implement transaction creation for mobile topup offers. An API-key authenticated client submits an offer, MSISDN, amount, and optional `external_id`; the system validates the request, reserves wallet funds atomically, creates a `PENDING` transaction, and enqueues provider work.

## Acceptance criteria

- [ ] `POST /transactions` accepts `offer_id`, `msisdn`, `amount`, and optional `external_id`.
- [ ] Only ApiKey-authenticated clients can create transactions.
- [ ] The selected offer must be active and compatible with mobile topup transaction creation.
- [ ] Amount is validated against the offer's minimum and maximum DZD constraints.
- [ ] MSISDN is validated as an Algerian E.164 number and against code-constant operator prefixes for the selected product.
- [ ] `external_id` is optional, immutable after creation, and unique per user when present.
- [ ] Insufficient available wallet balance prevents transaction creation.
- [ ] Successful creation atomically moves funds from available balance to reserved balance, writes a ledger entry, creates a `PENDING` transaction, and enqueues work.
- [ ] Tests cover success, insufficient balance, invalid offer, inactive offer, invalid amount, invalid MSISDN, wrong operator prefix, duplicate `external_id`, and reservation math.

## Blocked by

- `.scratch/topup-transactions/issues/04-create-wallet-and-deposit-path.md`
- `.scratch/topup-transactions/issues/08-protect-integration-apis-with-apikey-auth-and-rate-limits.md`
- `.scratch/topup-transactions/issues/06-publish-initial-digital-product-catalog.md`
