# Wallet Account API Contract

Issue 04 uses admin-managed user creation and camelCase JSON for wallet/account APIs. The draft partner PDF shows public-style client registration assumptions and snake_case examples, but the implemented v1 API follows the existing Nest DTO style and makes ADMIN users provision client-account identities explicitly through admin routes; future integration API-key work can expose the same account concepts without reintroducing public signup.
