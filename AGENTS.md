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
