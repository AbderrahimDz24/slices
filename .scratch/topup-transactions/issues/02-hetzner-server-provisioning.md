# Hetzner Server Provisioning

Status: ready-for-human
Type: HITL

## What to build

Provision the first single-VM Hetzner deployment target for the TopUp API. The server should be ready for Docker-based deployment with controlled SSH access, firewall rules, persistent storage, and an unprivileged deployment user.

## Acceptance criteria

- [ ] A Hetzner VM is created with the agreed region, size, operating system, and SSH key access.
- [ ] Firewall rules expose only SSH, HTTP, and HTTPS publicly unless another port is explicitly approved.
- [ ] Docker and Docker Compose are installed and verified.
- [ ] A non-root deployment user exists and can manage the application stack.
- [ ] Persistent directories for database, Redis, reverse proxy, backups, and deployment assets are created.
- [ ] Server access details and operational notes are recorded outside the public repo.

## Blocked by

None - can start immediately.
