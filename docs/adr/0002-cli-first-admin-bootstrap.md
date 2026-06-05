# CLI First Admin Bootstrap

The first ADMIN user is created by an explicit CLI command, not by app startup or an HTTP endpoint. This keeps bootstrap credentials out of the long-running runtime path, avoids exposing unauthenticated admin creation over the API, and makes the one-time fail-closed behavior auditable: once any ADMIN exists, additional admins must be created through authenticated admin user management.
