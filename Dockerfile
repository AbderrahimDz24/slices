# Multi-stage Dockerfile for NestJS app

# 1) Base builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy sources and build
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src
RUN npm run build

# 2) Production runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Only copy necessary files
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built dist from builder
COPY --from=builder /app/dist ./dist

# Expose Nest default port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
