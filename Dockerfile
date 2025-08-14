# Build Angular app
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY src ./src
COPY angular.json tsconfig.json tsconfig.app.json ./
RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist/booking-frontend /usr/share/nginx/html
EXPOSE 80
