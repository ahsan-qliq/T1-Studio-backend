FROM public.ecr.aws/lambda/nodejs:22 AS builder

WORKDIR ${LAMBDA_TASK_ROOT}

# Install pnpm
RUN npm install -g pnpm@11.20.0

# Copy dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies including devDependencies
RUN pnpm install --frozen-lockfile

# Copy TypeScript config and source
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN pnpm run build

# Remove dev dependencies
RUN pnpm prune --prod


# -------------------------
# Production Lambda image
# -------------------------
FROM public.ecr.aws/lambda/nodejs:22

WORKDIR ${LAMBDA_TASK_ROOT}

# Copy production dependencies
COPY --from=builder ${LAMBDA_TASK_ROOT}/node_modules ./node_modules

# Copy compiled application
COPY --from=builder ${LAMBDA_TASK_ROOT}/dist ./dist

COPY package.json ./

# Lambda handler
CMD ["dist/lambda.handler"]