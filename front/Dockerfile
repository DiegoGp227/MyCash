FROM node:20-alpine AS builder
WORKDIR /app

# Habilitar pnpm
RUN corepack enable

# Copiar manifests
COPY package.json pnpm-lock.yaml /app/

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código
COPY . .

# Build
RUN pnpm build

# -------------------------

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiar salida standalone
COPY --from=builder /app/.next/standalone /app/
COPY --from=builder /app/.next/static /app/.next/static/
COPY --from=builder /app/public /app/public/

EXPOSE 3000
CMD ["node", "server.js"]
