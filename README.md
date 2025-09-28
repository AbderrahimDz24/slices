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

Tip: Use the Swagger UI to explore endpoints. You can sign up and sign in to obtain a JWT, then click Authorize in Swagger to persist the token.


## Local development
If you prefer to run the API locally with Node and only run Postgres via Docker, follow these steps.

1) Install dependencies
```bash
npm ci
# or: npm install
```

2) Start Postgres for dev (detached)
```powershell
# From the project root
docker compose -f docker/docker-compose.dev.yml up -d
# or with Docker Compose v1
# docker-compose -f docker/docker-compose.dev.yml up -d
```
- Data volume path (on host): docker/postgres_data
- Stop dev DB: `docker compose -f docker/docker-compose.dev.yml down`

3) Configure environment
The app reads configuration from environment variables (via @nestjs/config). When running locally, typical values are:
- PG_HOST=localhost
- PG_PORT=5432
- PG_USER=postgres
- PG_PASSWORD=123456
- PG_DB=slices
- JWT_SECRET=supersecret_dev_key
- JWT_TOKEN_AUDIENCE=http://localhost:3000
- JWT_TOKEN_ISSUER=http://localhost:3000
- JWT_ACCESS_TOKEN_TTL=1h
- JWT_REFRESH_TOKEN_TTL=7d

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

4) Run the API
```bash
npm run start:dev
```
Now open http://localhost:3000 and http://localhost:3000/docs

Notes:
- TypeORM is configured with `synchronize: true` for this demo (see src/app.module.ts). Do not use this in production.
- Swagger is available at /docs and includes a global Bearer auth header; click Authorize to set your JWT.


## Project structure (high level)
- src/
  - core/ … cross-cutting concerns (e.g., auth)
  - features/
    - users/ … signup/signin slice with DTOs and handlers
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
