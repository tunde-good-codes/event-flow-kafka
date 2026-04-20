# ================================
# Stage 1: Install dependencies
# ================================
FROM node:20-alpine AS deps

RUN npm install -g npm

WORKDIR /app

# Copy workspace config + root manifest first
COPY package.json npm-lock.yaml npm-workspace.yaml ./

# Copy all app package.json files so npm knows about workspaces
COPY apps/api-gateway/package.json ./apps/api-gateway/
COPY apps/auth-service/package.json ./apps/auth-service/
COPY apps/events-service/package.json ./apps/events-service/
COPY apps/tickets-service/package.json ./apps/tickets-service/
COPY apps/notifications-service/package.json ./apps/notifications-service/

RUN npm install --frozen-lockfile

# ================================
# Stage 2: Build the specific service
# ================================
FROM node:20-alpine AS builder

RUN npm install -g npm

# ARG is build-time — this is what we need for the build command
ARG SERVICE
ENV SERVICE=${SERVICE}

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Uses ARG SERVICE at build time
RUN npm run build ${SERVICE}

# ================================
# Stage 3: Lean production image
# ================================
FROM node:20-alpine AS runner

ARG SERVICE
ENV SERVICE=${SERVICE}
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "node dist/apps/${SERVICE}/main.js"]