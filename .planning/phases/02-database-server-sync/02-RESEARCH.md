# Phase 2 Research: Database & Server Sync

## Goal 
Understand the architectural components needed to plan Phase 2, focusing on NestJS integration, Prisma ORM schema design, and an automated Markdown-to-Postgres sync pipeline.

## 1. Directory Structure & Monorepo Setup
- `apps/api` exists but is mostly empty. We must bootstrap the NestJS application here.
- Given Turborepo, Prisma can be contained within `apps/api/prisma` since `apps/web` will consume data exclusively via the REST API (per BACK-02 and monorepo simplicity), allowing Next.js to remain a pure presentation layer.

## 2. Database Schema Design (Prisma)
Addressing [BACK-01] and [BACK-03]: The schema needs to capture filename metadata and content.
```prisma
model Homily {
  id              String   @id @default(uuid())
  title           String
  datePublished   DateTime
  liturgicalYear  String?
  biblePassage    String?
  content         String   @db.Text
  slug            String   @unique
  originalFile    String   @unique // Essential for the UPSERT constraint [BACK-04]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([title])
  @@index([datePublished])
}
```
*Note*: `originalFile` acts as a unique constraint to ensure idempotent upsert operations.

## 3. NestJS API Design
Addressing [BACK-02]: A REST API is suitable here since requirements are strictly read-only and simple. 
- `GET /api/homilies`: List homilies. Should support `search` (query param), pagination parameters.
- `GET /api/homilies/:slug`: Retrieve full text content to be rendered by Next.js.
- NestJS should configure CORS to allow requests from the Traefik-proxy URL or the internal Docker network.

## 4. Markdown Sync Mechanism
Addressing [BACK-03, BACK-04, BACK-05]:
- **File Location:** The `homilies` directory resides at the root of the project (`../../homilies` relative to `apps/api`), the script must resolve this dynamic path safely.
- **Parsing Strategy:** A flexible regex to extract `Date - Title - Year - Bible passage` from the filename. `Date - Title - Year` might be the baseline with the passage being optional. 
- **Resilience:** The script will wrap the read/parse operations for each file in a `try/catch`. On failure, it will execute `Logger.warn(...)` outlining the problematic file and `continue` to the next, fulfilling [BACK-05].
- **Upsert:** `prisma.homily.upsert({ where: { originalFile: file }, update: { ... }, create: { ... } })` ensures multiple runs of the ingest script just refresh content instead of duplicating it, fulfilling [BACK-04].

## 5. Deployment / Docker Adjustments
- The `apps/api/Dockerfile` must be updated to include `npx prisma generate` and `npx prisma migrate deploy` in the production start script to ensure the VPS database is hydrated.

## 6. Validation Architecture
- **Unit/Integration Testing:** Ensure the Regex parser accurately fails softly.
- **Testing the API:** Validate `GET` responses.
- **Testing the Sync:** Run the sync against a dummy `homilies` folder containing 1 correct file and 1 malformed filename to guarantee warnings are emitted and the script completes.
