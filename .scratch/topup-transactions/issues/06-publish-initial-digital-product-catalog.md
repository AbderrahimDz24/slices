# Publish Initial Digital Product Catalog

Status: ready-for-agent
Type: AFK

## What to build

Repurpose the existing product concept into a generic digital product catalog. Publish the first mobile topup products, Mobilis, Djezzy, and Ooredoo, and expose one active `prepaid` variable-amount offer for each product.

## Acceptance criteria

- [ ] Products support a product type so `MOBILE_TOPUP` is the first type, not the only future type.
- [ ] Offers belong to products and support a variable amount with minimum and maximum DZD constraints.
- [ ] Mobilis, Djezzy, and Ooredoo products are available in the initial catalog.
- [ ] Each initial product has one active `prepaid` offer.
- [ ] Clients can list products.
- [ ] Clients can list offers for a product.
- [ ] Tests cover product listing, offer listing, active offer filtering, and amount configuration.

## Blocked by

- `.scratch/topup-transactions/issues/01-lock-topup-domain-language.md`
