# Finalize Transactions Through Sandbox Provider

Status: ready-for-agent
Type: AFK

## What to build

Add the provider boundary and the first sandbox provider, then process queued transactions with a BullMQ worker. The worker should move transactions through processing and terminal states while finalizing wallet reservations correctly.

## Acceptance criteria

- [ ] A provider interface exists for digital product transaction fulfillment.
- [ ] A sandbox provider implements mobile topup fulfillment with configurable success and failure behavior.
- [ ] A BullMQ worker picks up queued transactions and marks them `PROCESSING`.
- [ ] Successful provider results mark transactions `COMPLETED`, consume reserved wallet funds, and write a ledger entry.
- [ ] Failed provider results mark transactions `FAILED`, release reserved wallet funds back to available balance, and write a ledger entry with a failure reason.
- [ ] Processing is retry-safe enough that a repeated job cannot double-consume or double-release the same reservation.
- [ ] Tests cover success finalization, failure finalization, ledger entries, balance math, and repeated processing safety.

## Blocked by

- `.scratch/topup-transactions/issues/11-create-pending-mobile-topup-transaction.md`
