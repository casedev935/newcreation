FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install ALL full source
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Install dependencies (full, so prisma CLI is available)
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN cd apps/api && pnpm exec prisma generate

# Build the API
RUN pnpm turbo run build --filter=api...

# Install production-only deps to keep image lean
RUN pnpm install --frozen-lockfile --prod

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy everything needed to keep pnpm symlinks intact
COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/package.json
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/prisma ./apps/api/prisma
COPY --from=installer --chown=nestjs:nodejs /app/package.json ./package.json

USER nestjs
WORKDIR /app/apps/api

ENV PORT=3001
EXPOSE 3001

CMD ["node", "dist/main.js"]
