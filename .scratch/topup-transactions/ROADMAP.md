# TopUp Transactions Roadmap

Status: active

## Product Owner Progress Order

Use this order for progress tracking. Issue filenames are numbered in delivery order so product and DevOps work can move in parallel.

| Order | Issue | Track | Outcome |
| --- | --- | --- | --- |
| 1 | `01-lock-topup-domain-language.md` | Product | Team agrees on wallet, digital product, offer, transaction, deposit, API key, and provider terms. |
| 2 | `02-hetzner-server-provisioning.md` | DevOps | A Hetzner VM is ready for Docker deployment. |
| 3 | `03-production-container-setup.md` | DevOps | The app has a production-ready container stack shape. |
| 4 | `04-create-wallet-and-deposit-path.md` | Product | Admin can fund a user wallet and users can read DZD balances. |
| 5 | `05-expose-self-service-api-keys.md` | Product | Users can create, list, and revoke API keys. |
| 6 | `06-publish-initial-digital-product-catalog.md` | Product | Mobilis, Djezzy, and Ooredoo prepaid offers are visible. |
| 7 | `07-production-environment-config.md` | DevOps | Production/staging secrets and runtime settings are defined. |
| 8 | `08-protect-integration-apis-with-apikey-auth-and-rate-limits.md` | Product | Integration clients authenticate with API keys and are rate limited. |
| 9 | `09-cloudflare-domain-setup.md` | DevOps | The API hostname points to the Hetzner server through Cloudflare. |
| 10 | `10-reverse-proxy-and-tls.md` | DevOps | The public API domain serves HTTPS traffic through a reverse proxy. |
| 11 | `11-create-pending-mobile-topup-transaction.md` | Product | Clients can submit transactions and reserve wallet funds. |
| 12 | `12-read-transactions-for-reconciliation.md` | Product | Clients can check transaction status by ID or `external_id`. |
| 13 | `13-finalize-transactions-through-sandbox-provider.md` | Product | Sandbox fulfillment completes or fails transactions and finalizes wallet balances. |
| 14 | `14-standardize-integration-errors-and-request-ids.md` | Product | Clients receive stable error codes and request IDs. |
| 15 | `15-deployment-pipeline.md` | DevOps | Main branch can build, test, and deploy to Hetzner. |
| 16 | `16-backups-and-restore-check.md` | DevOps | Database and critical config backups can be restored. |
| 17 | `17-monitoring-and-logs.md` | DevOps | Uptime, logs, health, disk, worker, and backup status are visible. |
| 18 | `18-document-and-prove-v1-integration-contract.md` | Product | API docs and integration tests prove the contract. |
| 19 | `19-staging-smoke-test.md` | Release | Product owner verifies the deployed end-to-end flow. |

## Critical Paths

- Product: `01 -> 04/05/06 -> 08 -> 11 -> 12/13 -> 14 -> 18 -> 19`
- DevOps: `02 -> 09 -> 10 -> 15 -> 17 -> 19`, with `03 -> 07 -> 10/15/16` feeding the deployable stack.

## Tracking Columns

Use `Not Started`, `In Progress`, `Ready for Review`, and `Done` for product owner reporting.
