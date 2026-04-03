# ⛪ NewCreation Homily Platform

**NewCreation** is a modern, high-performance homily transcription and management platform. Built with a monorepo architecture, it features a unique **Neo-Brutalist** design and a metadata-driven ingestion pipeline.

---

## 🚀 Tech Stack

- **Monorepo Management**: [Turbo](https://turbo.build/)
- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Backend API**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS (Neo-Brutalist Design Language)
- **Deployment**: Docker, Traefik, GitHub Actions (CI/CD)

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker & Docker Compose](https://www.docker.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/casedev935/newcreation.git
   cd newcreation
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory (refer to `.env.example`).
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/newcreation"
   NEXT_PUBLIC_API_URL="http://localhost:3001"
   ```

4. Start the development environment:
   ```bash
   # Starts Database, API, and Frontend in development mode
   pnpm dev
   ```

---

## 🔄 Content Ingestion & Sync

To ingest new homilies from the `content/homilies` directory into the database:

1. Add your Markdown files to `content/homilies/`.
2. Run the synchronization script:
   ```bash
   cd apps/api
   pnpm sync
   ```
The sync service automatically parses filenames to extract **Date**, **Season**, **Liturgical Year**, and **Bible Passages**.

---

## 🏗️ Architecture

- **`apps/web`**: Next.js frontend. Highly responsive, mobile-optimized, and accessibility-focused.
- **`apps/api`**: NestJS backend providing a RESTful API for homily retrieval and search.
- **`content/`**: The source of truth for homily data in Markdown format.

---

## 🚢 Deployment

The project is configured for automated deployment to a VPS using **GitHub Actions**.

- **Branch Strategy**: Pushes to `main` trigger the production build and deploy.
- **Reverse Proxy**: Uses **Traefik** for automatic SSL (Let's Encrypt) and routing.
- **Containerization**: 
  - `newcreation-web`: Frontend service (port 3000)
  - `newcreation-api`: Backend service (port 3001)

### CI/CD Deployment Flow
1. Build & Push Docker images to **GitHub Container Registry (GHCR)**.
2. Transfer `docker-compose.yml` to the VPS via SCP.
3. Pull images and restart containers via SSH.
4. Execute `prisma migrate deploy` automatically.

---

## 🎨 Design Principles (Neo-Brutalism)

- **High Contrast**: Pure blacks, vibrant accent colors, and stark white/grey backgrounds.
- **Bold Borders**: Consistent 4px/2px black borders on interactive elements.
- **Shadows**: "Hard" shadows without blur for a tactile, physical feel.
- **Typography**: Clean, oversized sans-serif fonts for hierarchy.

---

## 📄 License

This project is licensed under the [UNLICENSED](LICENSE) license.