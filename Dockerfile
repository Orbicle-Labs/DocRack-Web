# syntax=docker/dockerfile:1

# ---- Base ----
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- Dependencies (cached layer) ----
FROM base AS deps
COPY package.json package-lock.json ./
# --ignore-scripts skips the "prepare: husky install" script, which fails/is void in Docker
RUN npm ci --ignore-scripts

# ---- Builder ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# All config (GOOGLE_SHEET_ID, RESEND_API_KEY, NOTIFY_EMAIL) is server-side and
# injected at RUNTIME — the build needs no env vars
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runner (small final image) ----
FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
