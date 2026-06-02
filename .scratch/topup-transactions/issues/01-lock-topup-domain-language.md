# Lock TopUp Domain Language

Status: ready-for-human
Type: HITL

## What to build

Define the shared domain glossary for the TopUp transaction work so future implementation issues use stable vocabulary. The glossary should cover client accounts, wallets, digital products, product types, offers, transactions, API keys, deposits, providers, and `external_id`.

Mobile topup should be described as the first digital product type, not as the whole platform model.

## Acceptance criteria

- [x] `CONTEXT.md` exists at the repo root and follows the repo's glossary-only domain-doc convention.
- [x] Glossary entries define `User`, `Client Account`, `Wallet`, `Deposit`, `Digital Product`, `Product Type`, `Offer`, `Transaction`, `API Key`, `Provider`, and `external_id`.
- [x] The glossary states that `MOBILE_TOPUP` is the first product type and leaves room for future digital product types.
- [x] The glossary avoids implementation details such as table names, routes, DTOs, queues, or file paths.

## Blocked by

None - can start immediately.
