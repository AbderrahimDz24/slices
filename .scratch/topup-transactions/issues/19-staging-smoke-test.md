# Staging Smoke Test

Status: ready-for-human
Type: HITL

## What to build

Run a product-owner-facing smoke test against the deployed environment. The test should confirm the deployed domain supports the core integration story from wallet funding through transaction lookup.

## Acceptance criteria

- [ ] A test user exists with access to create API keys.
- [ ] An ADMIN can deposit DZD into the test user's wallet.
- [ ] The test user can create an API key and use it through the public HTTPS domain.
- [ ] Products and offers are visible through the deployed API.
- [ ] A mobile topup transaction can be created and looked up by transaction ID.
- [ ] The same transaction can be looked up by `external_id`.
- [ ] Sandbox fulfillment moves the transaction to a terminal state and wallet balances remain correct.
- [ ] Smoke test results are shared with the product owner.

## Blocked by

- `.scratch/topup-transactions/issues/18-document-and-prove-v1-integration-contract.md`
- `.scratch/topup-transactions/issues/15-deployment-pipeline.md`
- `.scratch/topup-transactions/issues/17-monitoring-and-logs.md`
