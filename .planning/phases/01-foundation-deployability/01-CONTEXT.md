# Phase 1: Foundation & Deployability - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning
**Source:** PRD Express Path (.contexto/requisitos iniciais.md)

<domain>
## Phase Boundary

Establishing a robust monorepo, initializing the containerized environment with specific footprints, and ensuring a fully automated deployment pipeline mapping to an existing Traefik network. This phase lays the foundation for all subsequent services.

</domain>

<decisions>
## Implementation Decisions

### Architecture & Workspaces
- [LOCKED] Must be a Monorepo Architecture leveraging **Turborepo**.
- [LOCKED] Package manager must be **pnpm** to ensure efficiency in dependency storage.
- [LOCKED] Use Git Flow and Standard Version for release handling.

### Docker Environment
- [LOCKED] Base images must use `node:20-slim` or `node:20-alpine` to maintain a footprint strictly under 100MB per container.
- [LOCKED] Use `docker-compose.yml` for production and `docker-compose-override.yml` for local development.
- [LOCKED] Development overrides must allow hot-reloading (syncing code via volumes).
- [LOCKED] Docker Daemon configs must include Log Rotation (`daemon.json`) to prevent disk exhaustion.
- [LOCKED] Create specialized `.dockerignore` for each image.

### Deployment & Infrastructure (VPS CI/CD)
- [LOCKED] Utilize GitHub Actions to build Docker images and perform SSH deploys to the VPS.
- [LOCKED] The application proxy domain must be `newcreation.mediamanager.tech`.
- [LOCKED] Services must connect through an existing `gateway_network` to be auto-discovered by Traefik.
- [LOCKED] Secrets must reside entirely in `.env`; provide a `.env.example` template. No hardcoded logic allowed.

### AI Constraints
- [LOCKED] Include `.geminignore` file to restrict AI context parsing limits.
- [LOCKED] Adhere to GSD best practices and maintain didactical explanations in the code.

### the agent's Discretion
- ESLint and Prettier setups across the monorepo root.
- The precise structure inside the Github Action YAML (trigger on main/master, SSH deployment mechanism).
- Mapping of Docker volume mounts in the `docker-compose-override.yml`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Workflows
- `README.md` — For initial project insights from root.

</canonical_refs>

<specifics>
## Specific Ideas

- Ensure `output: 'standalone'` is noted early for the Next.js setup constraints.

</specifics>

<deferred>
## Deferred Ideas

- Actual NestJS Prisma bootstrapping, API logic, and NextJS UI are deferred to Phases 2 and 3.

</deferred>

---

*Phase: 01-foundation-deployability*
*Context gathered: 2026-04-01 via PRD Express Path*
