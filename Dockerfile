# ==========================================
# Stage 1: Build Vite React Application
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci || npm install

# Optional build-time environment arguments (for Render)
ARG VITE_GROQ_API_KEY
ARG VITE_GROQ_MODEL

ENV VITE_GROQ_API_KEY=$VITE_GROQ_API_KEY
ENV VITE_GROQ_MODEL=$VITE_GROQ_MODEL

# Copy source code
COPY . .

# Build production bundle
RUN npm run build

# ==========================================
# Stage 2: High-Performance Nginx Server
# ==========================================
FROM nginx:alpine

# Default PORT for Render (Render sets PORT dynamically)
ENV PORT=80

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx template with envsubst support for dynamic $PORT
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Expose default port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
