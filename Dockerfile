# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install  # Installs all dependencies (including devDependencies)
COPY . .
RUN npm run build  # Creates optimized production build in `/app/build`

# Stage 2: Serve (Production)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]






