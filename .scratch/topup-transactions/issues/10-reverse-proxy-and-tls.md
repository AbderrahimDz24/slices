# Reverse Proxy And TLS

Status: ready-for-agent
Type: AFK

## What to build

Serve the API through a reverse proxy on the Hetzner VM with HTTPS enabled. The proxy should forward traffic to the API container, preserve request metadata, and support a health-checkable deployment.

## Acceptance criteria

- [ ] A reverse proxy service is added to the production stack using Caddy, Nginx, or Traefik.
- [ ] HTTP traffic is redirected to HTTPS.
- [ ] TLS certificates are issued and renewed automatically.
- [ ] Proxy headers preserve host, scheme, client IP, and request ID compatibility.
- [ ] The API health or docs endpoint is reachable through the HTTPS domain.
- [ ] Proxy logs are available through the deployment logging workflow.

## Blocked by

- `.scratch/topup-transactions/issues/07-production-environment-config.md`
- `.scratch/topup-transactions/issues/09-cloudflare-domain-setup.md`
