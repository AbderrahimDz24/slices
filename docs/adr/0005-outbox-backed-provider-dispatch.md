# Outbox Backed Provider Dispatch

Mobile topup creation records the transaction, reserves wallet funds, and writes durable provider work in one Postgres transaction, then attempts BullMQ enqueue after commit. We chose this outbox-backed dispatch instead of treating Postgres reservation and Redis enqueue as one atomic operation because Redis cannot participate in the database transaction, and a future worker can safely recover pending provider work from the durable outbox when immediate enqueue fails.
