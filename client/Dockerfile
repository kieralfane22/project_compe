# /client/Dockerfile
FROM node:18 as build
WORKDIR /client
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /client/build /usr/share/nginx/html
