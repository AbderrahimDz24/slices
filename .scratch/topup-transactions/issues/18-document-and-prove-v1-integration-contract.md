# Document And Prove V1 Integration Contract

Status: ready-for-agent
Type: AFK

## What to build

Document the v1 integration contract in Swagger and add integration tests that prove the main API-key, wallet, catalog, transaction, provider, and error flows work together.

## Acceptance criteria

- [ ] Swagger documents API key management, ApiKey auth, wallet/account reads, OWNER deposits, products, offers, transactions, errors, and rate limits.
- [ ] Integration tests cover key creation, key revocation, deposit, account read, product/offer discovery, transaction creation, transaction reads, sandbox success, sandbox failure, duplicate `external_id`, insufficient balance, prefix rejection, account isolation, and rate limiting.
- [ ] Tests verify wallet available/reserved/total balance changes through reservation, success consumption, and failure release.
- [ ] Tests verify no API response leaks hashed API key material.
- [ ] The full test suite passes.

## Blocked by

- `.scratch/topup-transactions/issues/04-create-wallet-and-deposit-path.md`
- `.scratch/topup-transactions/issues/05-expose-self-service-api-keys.md`
- `.scratch/topup-transactions/issues/08-protect-integration-apis-with-apikey-auth-and-rate-limits.md`
- `.scratch/topup-transactions/issues/06-publish-initial-digital-product-catalog.md`
- `.scratch/topup-transactions/issues/11-create-pending-mobile-topup-transaction.md`
- `.scratch/topup-transactions/issues/12-read-transactions-for-reconciliation.md`
- `.scratch/topup-transactions/issues/13-finalize-transactions-through-sandbox-provider.md`
- `.scratch/topup-transactions/issues/14-standardize-integration-errors-and-request-ids.md`
