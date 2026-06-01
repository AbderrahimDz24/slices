# Project Conventions

## Feature Structure
Each feature under `src/features/<feature>` should use this layout when the folders are needed:

- `core/<feature>.core.module.ts`
- `dtos/index.ts`
- `models/`
- `repositories/`
- `services/`
- `slices/<slice>/...`
- `<feature>.module.ts`

Feature-root support folders such as `common/`, `decorators/`, and `guards/` are allowed only for cross-slice support code.

## Imports
- Cross-feature imports must stay at two segments max, for example `@products/services`, `@auth/dtos`, `@users/core`, `@core/cqrs`, and `@common/enums`.
- Do not deep-import feature internals such as `@auth/core/auth.core.module` or `@products/slices/...`.
- Keep relative imports local to the current slice.
- If one slice needs another slice's DTO or shared capability, re-export it through the feature root barrel first.

## Migrations
- Generate schema migrations with the `npm` scripts whenever possible. Use `npm run migration:generate` instead of hand-writing schema migrations.
- Treat schema migrations and backfill/data migrations as separate work. If a change needs both, create separate migrations instead of mixing schema and data backfill in one file.
- Write a migration manually only when generation cannot express the change, such as a backfill migration.
- Use `npm run migration:run` and `npm run migration:revert` for applying or reverting migrations.
- If a local or unmerged migration needs to change, do not modify it in place. Delete the old migration, run `npm run dev:db:reset`, then generate a new migration.
- Do not rewrite shared or already-applied migration history. If a committed migration needs to change after it has been shared or applied, add a follow-up migration instead.

## Agent skills

### Issue tracker

Issues and PRDs are tracked as local markdown files under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five-role triage vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context domain documentation layout. See `docs/agents/domain.md`.
