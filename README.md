# Vertical Slices Architecture Demo (NestJS)

This repository is a small demo that showcases the Vertical Slices Architecture using NestJS. Instead of organizing code by technical layers (controllers/services/repos), features are grouped end-to-end. Each slice owns its route handlers, DTOs, validation, business logic, and persistence code.

Highlights:

- Feature-first structure (e.g., users, products) to keep related code together
- TypeORM + Postgres
- Built-in Swagger docs with a global Bearer JWT auth header

Docs: once running, open http://localhost:3000/docs

## Quick start (Docker demo)

Run the complete demo (API + Postgres) using Docker from the project root.

```powershell
# From the project root
docker compose up --build
# or with older Docker Compose v1
# docker-compose up --build
```

- API: http://localhost:3000
- Swagger: http://localhost:3000/docs
- Postgres runs inside the compose network. The app connects internally with PG_HOST=postgres and PG_PORT=5432 (see docker-compose.yml).
- Stop the stack: `docker compose down`

Tip: Bootstrap the first admin user, sign in, then click Authorize in Swagger to persist the JWT.

## Local development

If you prefer to run the API locally with Node and only run Postgres and Redis via Docker, follow these steps.

1. Install dependencies

```bash
npm ci
# or: npm install
```

2. Configure environment
   The app reads configuration from environment variables (via @nestjs/config). When running locally, typical values are:

- PG_HOST=localhost
- PG_PORT=50051
- PG_USER=postgres
- PG_PASSWORD=123456
- PG_DB=slices
- REDIS_HOST=localhost
- REDIS_PORT=50052
- CLIENT_ACCOUNT_RATE_LIMIT_LIMIT=60
- CLIENT_ACCOUNT_RATE_LIMIT_TTL_MS=60000
- COMPOSE_PROJECT_NAME=slices-api-dev
- JWT_SECRET=supersecret_dev_key
- JWT_TOKEN_AUDIENCE=http://localhost:3000
- JWT_TOKEN_ISSUER=http://localhost:3000
- JWT_ACCESS_TOKEN_TTL=1h
- JWT_REFRESH_TOKEN_TTL=7d
- API_KEY_MODE=test
- BOOTSTRAP_ADMIN_EMAIL=admin@topups.com
- BOOTSTRAP_ADMIN_PASSWORD=strong-password

Recommended: copy .env.example to .env at the project root and adjust values as
needed. The app auto-loads .env via @nestjs/config.

Examples:

- Windows CMD:
  ```bat
  copy .env.example .env
  ```
- macOS/Linux:

  ```bash
  cp .env.example .env
  ```

- PowerShell:
  ```powershell
  Copy-Item -Path .env.example -Destination .env
  ```

3. Start Postgres and Redis for dev (detached)

```bash
npm run dev:docker:up
```

- Stop the dev Docker stack: `npm run dev:docker:down`
- The Docker scripts require `.env` at the project root and read published ports from it.

4. Reset and migrate the local database when starting from disposable local state

```bash
npm run dev:db:reset
npm run migration:run
```

- The initial role enum now uses `ADMIN`, not `OWNER`; reset old local DBs before rerunning migrations.

5. Create the first admin user

```bash
npm run admin:bootstrap
```

- The script reads `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` from `.env`.
- It fails once any `ADMIN` exists. Create later admins through `POST /admin/users`.

6. Run the API

```bash
npm run start:dev
```

Now open http://localhost:3000 and http://localhost:3000/docs

Notes:

- TypeORM schema changes are applied through migrations; do not rely on `synchronize` for local schema setup.
- `API_KEY_MODE` must be `test` for local/dev/staging environments and `live` for production. API keys from one mode are rejected by servers running in the other mode.
- Integration API reads are rate-limited per Client Account. Bearer and ApiKey requests for the same Client Account share the `CLIENT_ACCOUNT_RATE_LIMIT_LIMIT` budget over `CLIENT_ACCOUNT_RATE_LIMIT_TTL_MS`; Redis must be reachable at `REDIS_HOST:REDIS_PORT` for enforcement. If Redis is unavailable at runtime, the app logs the storage error and allows the request.
- Swagger is available at /docs and includes global Bearer and ApiKey auth headers; click Authorize to set credentials.

## Project structure (high level)

- src/
  - core/ … cross-cutting concerns (e.g., auth)
  - features/
    - users/ … admin-managed user creation and user persistence
    - auth/ … signin and token refresh slices
    - products/ … example slice
  - main.ts … app bootstrapping and Swagger setup

This layout keeps all the code for a feature in one place, aligning with the vertical slices approach.

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## License

MIT
