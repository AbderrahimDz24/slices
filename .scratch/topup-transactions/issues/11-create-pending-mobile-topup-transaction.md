# Create Confirmed Mobile Topup Transaction

Status: ready-for-agent
Type: AFK

## What to build

Implement transaction creation for mobile topup offers. An API-key authenticated client submits an offer, MSISDN, amount, and optional `externalId`; the system validates the request, reserves wallet funds atomically with durable provider work, creates a `CONFIRMED` transaction, and attempts BullMQ enqueue from an outbox-backed dispatch record.

## Acceptance criteria

- [ ] `POST /topups` accepts `offerId`, `msisdn`, `amount`, and optional `externalId`.
- [ ] Only ApiKey-authenticated clients can create transactions.
- [ ] The selected offer must be active and compatible with mobile topup transaction creation.
- [ ] Amount is validated against the offer's minimum and maximum DZD constraints.
- [ ] MSISDN is validated as an Algerian E.164 number and against code-constant mobile network prefixes for the selected product.
- [ ] `externalId` is optional, immutable after creation, and unique per user when present.
- [ ] Insufficient available wallet balance prevents transaction creation and does not consume `externalId`.
- [ ] Successful creation atomically moves funds from available balance to reserved balance, writes a ledger entry linked by `transactionId`, creates a `CONFIRMED` transaction, writes durable outbox work, and attempts BullMQ enqueue after commit.
- [ ] Tests cover success, insufficient balance, invalid offer, inactive offer, invalid amount, invalid MSISDN, wrong mobile network prefix, duplicate `externalId`, and reservation math.

## Blocked by

- `.scratch/topup-transactions/issues/04-create-wallet-and-deposit-path.md`
- `.scratch/topup-transactions/issues/08-protect-integration-apis-with-apikey-auth-and-rate-limits.md`
- `.scratch/topup-transactions/issues/06-publish-initial-digital-product-catalog.md`
