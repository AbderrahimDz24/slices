# Cloudflare Domain Setup

Status: ready-for-human
Type: HITL

## What to build

Configure Cloudflare DNS and edge settings so the public API domain points to the Hetzner deployment. Cloudflare should provide DNS management, proxying where appropriate, TLS mode configuration, and basic edge protection.

## Acceptance criteria

- [ ] The API hostname is agreed and created in Cloudflare DNS.
- [ ] DNS records point to the Hetzner server public IP.
- [ ] Cloudflare SSL/TLS mode is compatible with the reverse proxy certificate strategy.
- [ ] Proxying, caching, and security settings are configured for an API, not a static website.
- [ ] Basic edge rules avoid caching API responses and preserve API method behavior.
- [ ] The public hostname resolves to the Hetzner server and Cloudflare settings are ready for reverse proxy TLS verification.

## Blocked by

- `.scratch/topup-transactions/issues/02-hetzner-server-provisioning.md`
