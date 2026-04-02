# Roadmap: NewCreation

## Overview

NewCreation's roadmap focuses on a fast realization of the homily viewer by setting up a solid monorepo foundation, migrating markdown files into a resilient Postgres database, and publishing a performant Next.js reader frontend directly connected to the Traefik VPS load balancer.

## Phases

- [ ] **Phase 1: Foundation & Deployability** - Turborepo skeleton, Docker setup, and GitHub Actions CI/CD to VPS.
- [ ] **Phase 2: Database & Server Sync** - NestJS API with Prisma ORM and the resilient MD-to-Postgres Upsert Script.
- [ ] **Phase 3: Frontend Interface & Delivery** - Next.js dashboard, search, and Markdown rendering.

## Phase Details

### Phase 1: Foundation & Deployability
**Goal**: Establish a deployable monorepo structure integrated with Docker and VPS infrastructure from Day 1.
**Depends on**: Nothing (first phase)
**Requirements**: [INFR-01, INFR-02, INFR-03, INFR-04, INFR-05]
**Success Criteria** (what must be TRUE):
  1. Turborepo structure resolves `pnpm` workspaces for NestJS and Next.js applications natively.
  2. The `docker-compose.yml` configuration links the services efficiently to Traefik on the `gateway_network`.
  3. GitHub Actions successfully pushes slim Docker images to the VPS and updates containers seamlessly.
**Plans**: TBD

Plans:
- [ ] 01-01: Initialize Turborepo workspaces and ESLint configurations.
- [ ] 01-02: Create optimized `node:20-slim` Dockerfiles and log-rotated orchestrations.
- [ ] 01-03: Implement the GitHub Actions CI/CD workflow for VPS deploy.

### Phase 2: Database & Server Sync
**Goal**: Implement the robust ingest mechanism bridging static Markdown files to Postgres persistence.
**Depends on**: Phase 1
**Requirements**: [BACK-01, BACK-02, BACK-03, BACK-04, BACK-05]
**Success Criteria** (what must be TRUE):
  1. Prisma correctly initializes a standalone logical schema inside the shared PostgreSQL database.
  2. `sync-transcriptions.ts` successfully reads `Data - Title - Year` paths and populates the DB via Upsert.
  3. The NestJS API exposes robust endpoints serving homily arrays and formatted strings.
**Plans**: TBD

Plans:
- [ ] 02-01: Bootstrap NestJS service and define Prisma PostgreSQL schemas.
- [ ] 02-02: Implement automated `.md` reader, metadata extractor, and batch database synchronizer.
- [ ] 02-03: Develop REST endpoints handling Markdown transmission and table properties.

### Phase 3: Frontend Interface & Delivery
**Goal**: Establish the search and content rendering engine consumed by public readership.
**Depends on**: Phase 2
**Requirements**: [FRON-01, FRON-02, FRON-03, FRON-04, FRON-05]
**Success Criteria** (what must be TRUE):
  1. A root Dashboard displays homilies alongside functioning Keyword search filtering.
  2. Clicking homilies triggers a reliable read-only Markdown viewer maintaining the styling.
  3. English navigation holds the breadcrumb pathing stable at `newcreation.mediamanager.tech`.
**Plans**: TBD

Plans:
- [ ] 03-01: Initialize Next.js standalone SSR application and structural layout/styling.
- [ ] 03-02: Build homily dashboard table, pagination/listing view, and client-side searching logic.
- [ ] 03-03: Construct SSR Markdown reader, sanitization algorithms, and page-level breadcrumbs.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Deployability | 0/3 | Not started | - |
| 2. Database & Server Sync | 0/3 | Not started | - |
| 3. Frontend Interface & Delivery | 0/3 | Not started | - |
