FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache dumb-init

# Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && cp -R node_modules /prod_modules
RUN npm ci

# Build
FROM deps AS build
COPY . .
RUN npm run build

# Production image
FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps /prod_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

EXPOSE 5000
USER node
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/app.js"]
