# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy rest of app
COPY . .

# Build Next.js app
RUN pnpm build

# Expose Next.js port
EXPOSE 3000

# Force environment
ENV PORT=3000
ENV HOST=0.0.0.0

# Start Next.js app in production mode
CMD ["pnpm", "start"]
