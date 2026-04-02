# NewCreation

## What This Is

NewCreation is a web-based platform designed to centralize and facilitate the reading of homily transcriptions from a YouTube channel. It provides a clean, fast, and optimized interface for both mobile and desktop users to browse, search, and read homilies transcribed into English.

## Core Value

Providing an accessible, high-performance, and read-only repository of spiritual homilies for public sharing through automated synchronization of Markdown content.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Monorepo Architecture**: Setup Turborepo and pnpm for managing microservices (NestJS, Next.js).
- [ ] **Backend Service (NestJS)**: REST API to serve homily metadata and content via Prisma ORM.
- [ ] **Frontend Service (Next.js)**: SSR-based interface for listing homilies and rendering Markdown content.
- [ ] **Database & Persistence**: PostgreSQL instance with Prisma, including automated schema creation on VPS.
- [ ] **Data Synchronization Script**: Automated `upsert` script to populate the database from local `.md` files in the `homilias` folder.
- [ ] **Metadata Extraction**: Filename-based parsing (`Data - Título - Ano`) with log warnings for format mismatches.
- [ ] **Search & Filtering**: Dashboard with keyword search on titles and metadata columns.
- [ ] **Navigation**: Breadcrumb-style navigation (Homilies > [Title]).
- [ ] **Dockerization**: Specific Dockerfiles for services and `docker-compose` for local/production environments.
- [ ] **CI/CD Pipeline**: GitHub Actions for automated build, push, and deploy to VPS via SSH.
- [ ] **Reverse Proxy Integration**: Deployment behind the existing Traefik proxy on the `gateway_network`.
- [ ] **Language Integrity**: All UI and content (transcriptions) maintained in English.

### Out of Scope

- [ ] **Authentication/Login**: Not required for current read-only public access.
- [ ] **Web-based Editing**: Content source of truth remains the `.md` files; no edit UI provided.
- [ ] **Additional Categories**: "Articles", "Other transcripts", and "Books" tabs are deferred to future milestones.

## Context

- **Environment**: Deploying to a VPS already running other services (Node/Postgres) behind Traefik.
- **Workflow**: Git Flow for branching and Standard Version for releases.
- **Content Source**: Approximately 200 pre-transcribed Markdown files located in a local `homilias` directory.
- **Goal**: Transition from local file-based reading to a scalable web platform accessible at `newcreation.mediamanager.tech`.

## Constraints

- **Tech Stack**: NestJS (API), Next.js (SSR, Standalone), Prisma (ORM), PostgreSQL (DB), Turborepo (Orchestration).
- **Architecture**: Microservices in a Monorepo.
- **Docker**: Images must be optimized (node:20-slim) to keep footprints under 100MB.
- **Infrastructure**: Must coexist with existing Traefik proxy on `gateway_network`.
- **Database**: Must handle schema creation in a shared Postgres instance without disrupting other projects.
- **Development**: Docker-based environment with hot-reloading via volumes and `pnpm dev`.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Microservices Monorepo | Clean separation of concerns while keeping orchestration simple with Turborepo. | — Pending |
| Filename Metadata | Consistent naming convention (`Data - Título - Ano`) allows for automated ingestion without frontmatter overhead. | — Pending |
| Log Warnings for Failures | User-requested behavior to ensure the sync process doesn't halt on isolated formatting errors. | — Pending |
| English Only | Homilies and UI are pre-standardized to English for a global audience. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-01 after project initialization*
