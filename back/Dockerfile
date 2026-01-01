# ======================
# Builder
# ======================
FROM node:20-slim AS builder

RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Activar pnpm vía corepack
RUN corepack enable

# Copiar solo manifests (cache)
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Instalar deps
RUN pnpm install --frozen-lockfile

# Generar Prisma Client
RUN pnpm prisma generate

# Copiar código fuente
COPY . .

# Build (TS → JS)
RUN pnpm build


# ======================
# Runner
# ======================
FROM node:20-slim

RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Activar pnpm
RUN corepack enable

# Copiar solo lo necesario
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copiar prisma (schema + migraciones si existen)
COPY prisma ./prisma

EXPOSE 2000

# Script de inicio que ejecuta migraciones y luego inicia el servidor
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]
