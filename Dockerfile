FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies layer (cached unless package.json changes)
COPY package.json package-lock.json ./
RUN npm ci --cache /tmp/npm-cache

# Build layer
COPY . .
RUN mkdir -p /app/public && npm run build

# Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV LOG_LEVEL=info

# Only copy what's needed to run
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

# Persistent data directory (mount a volume here in production)
RUN mkdir -p /app/data

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
