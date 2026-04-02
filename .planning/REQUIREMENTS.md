# Requirements: NewCreation

**Defined:** 2026-04-01
**Core Value:** Providing an accessible, high-performance, and read-only repository of spiritual homilies for public sharing through automated synchronization of Markdown content.

## v1 Requirements

### Infrastructure & Deployment

- [ ] **INFR-01**: Monorepo using Turborepo and pnpm is configured.
- [ ] **INFR-02**: Microservices (NestJS, Next.js) are containerized using optimized `node:20-slim` images.
- [ ] **INFR-03**: Docker environment mapped for development (hot-reload) and production (Traefik `gateway_network`).
- [ ] **INFR-04**: GitHub Actions CI/CD pipeline automates build, push, and remote VPS deployment.
- [ ] **INFR-05**: Log rotation is configured for Docker containers to save disk space.

### Backend & Database

- [ ] **BACK-01**: PostgreSQL schema is created and managed via Prisma ORM for the NewCreation architecture.
- [ ] **BACK-02**: NestJS REST API serves homily metadata (title, date, liturgical year) and parsed Markdown content.
- [ ] **BACK-03**: An automated synchronization script (`sync-transcriptions.ts`) reads local `.md` files from the `homilies` directory and extracts filename metadata (`Date published - Title - Year - Bible passage`).
- [ ] **BACK-04**: Synchronization script utilizes database `upsert` mechanism without disrupting existing records.
- [ ] **BACK-05**: Script logs warnings rather than aborting when detecting format mismatches in filenames.

### Frontend Application

- [ ] **FRON-01**: Next.js (Router, SSR) standalone app provides read-only UI for reading homilies.
- [ ] **FRON-02**: Dashboard table lists all homily transcriptions with Search/Filtering capabilities by keyword.
- [ ] **FRON-03**: Breadcrumb-style navigation tracks hierarchy (Homilies > [Title]).
- [ ] **FRON-04**: Markdown content is safely parsed, formatted to HTML, and displayed dynamically without editable capabilities.
- [ ] **FRON-05**: UI and content display adhere strictly to English language standardization.

## v2 Requirements

### Extended Content Features

- **CONT-01**: Add "Articles" categorization tab to the dashboard header.
- **CONT-02**: Add "Other transcripts" tab for non-homily materials.
- **CONT-03**: Add "Books" tab for full-length reading material indexing.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentication System | System is intentionally built for read-only public access. |
| Web-Based Editor | Content source of truth remains `.md` files; syncing replaces the need for online editing. |
| Multi-language Support | Currently, English handles global requirements natively without performance or UX overhead. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFR-01 | Phase 1 | Pending |
| INFR-02 | Phase 1 | Pending |
| INFR-03 | Phase 1 | Pending |
| INFR-04 | Phase 1 | Pending |
| INFR-05 | Phase 1 | Pending |
| BACK-01 | Phase 2 | Pending |
| BACK-02 | Phase 2 | Pending |
| BACK-03 | Phase 2 | Pending |
| BACK-04 | Phase 2 | Pending |
| BACK-05 | Phase 2 | Pending |
| FRON-01 | Phase 3 | Pending |
| FRON-02 | Phase 3 | Pending |
| FRON-03 | Phase 3 | Pending |
| FRON-04 | Phase 3 | Pending |
| FRON-05 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-01*
*Last updated: 2026-04-01 after initial definition*
