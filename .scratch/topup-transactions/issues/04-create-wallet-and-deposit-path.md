# Create Wallet And Deposit Path

Status: done
Type: AFK

## What to build

Add DZD wallets for users with cached balances and immutable ledger entries. Provide an ADMIN-only deposit flow that credits a user's wallet, and expose an authenticated account balance read so the wallet state can be verified end to end.

## Acceptance criteria

- [x] Each user can have a DZD wallet with available balance, reserved balance, total balance, and updated timestamp.
- [x] Deposits can be performed only by an ADMIN user.
- [x] A deposit increases the target wallet's available balance and writes an immutable ledger entry.
- [x] A user can read their own account balance and sees available, reserved, total, currency, and updated timestamp.
- [x] Schema changes are produced with the project's migration workflow.
- [x] Unit or integration tests cover deposit authorization, balance math, and ledger creation.
