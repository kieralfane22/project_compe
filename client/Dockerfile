# Build phase
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve phase
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Expose port and reduce logs
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
