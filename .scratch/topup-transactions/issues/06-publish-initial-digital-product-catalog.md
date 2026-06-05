# Publish Initial Digital Product Catalog

Status: done
Type: AFK

## What to build

Repurpose the existing product concept into a generic digital product catalog. Publish the first mobile topup products, Mobilis, Djezzy, and Ooredoo, and expose one active `prepaid` variable-amount offer for each product through authenticated `GET /offers`.

## Acceptance criteria

- [x] Products support a product type so `MOBILE_TOPUP` is the first type, not the only future type.
- [x] Offers belong to products and expose a controlled `inputSchema` with amount and MSISDN requirements.
- [x] Mobilis, Djezzy, and Ooredoo products are available in the initial catalog.
- [x] Each initial product has one active `prepaid` offer.
- [x] Clients can list active offers through authenticated `GET /offers`.
- [x] Offer responses embed product summaries so clients can associate offers with products.
- [x] Tests cover offer listing, active offer filtering, amount configuration, auth requirements, and removed legacy product routes.

## Blocked by

- `.scratch/topup-transactions/issues/01-lock-topup-domain-language.md`
