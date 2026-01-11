FROM mcr.microsoft.com/playwright:v1.48.0-jammy

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Install Playwright browsers (critical!)
RUN pnpm exec playwright install --with-deps chromium

# Copy source code
COPY . .

# Default command
CMD ["pnpm", "dev"]