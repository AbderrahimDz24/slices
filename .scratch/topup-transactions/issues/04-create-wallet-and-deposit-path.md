# Create Wallet And Deposit Path

Status: ready-for-agent
Type: AFK

## What to build

Add DZD wallets for users with cached balances and immutable ledger entries. Provide an OWNER-only deposit flow that credits a user's wallet, and expose an authenticated account balance read so the wallet state can be verified end to end.

## Acceptance criteria

- [ ] Each user can have a DZD wallet with available balance, reserved balance, total balance, and updated timestamp.
- [ ] Deposits can be performed only by an OWNER user.
- [ ] A deposit increases the target wallet's available balance and writes an immutable ledger entry.
- [ ] A user can read their own account balance and sees available, reserved, total, currency, and updated timestamp.
- [ ] Schema changes are produced with the project's migration workflow.
- [ ] Unit or integration tests cover deposit authorization, balance math, and ledger creation.

## Blocked by

- `.scratch/topup-transactions/issues/01-lock-topup-domain-language.md`
