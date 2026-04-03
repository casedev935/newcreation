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
RUN pnpm install

# Generate Prisma Client
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
RUN pnpm prisma generate --schema=apps/api/prisma/schema.prisma

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer /app/apps/api/package.json .
COPY --from=installer /app/apps/api/dist ./dist
# If api needs prisma, handle copying prisma schemas or node_modules here depending on structure.
COPY --from=installer /app/node_modules ./node_modules
# Expose port
ENV PORT=3001
EXPOSE 3001

CMD ["node", "dist/main.js"]
