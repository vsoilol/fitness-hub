# Dockerfile.vue
FROM node:14.21.3 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .

ARG VUE_APP_BACKEND_URL
ENV VUE_APP_BACKEND_URL $VUE_APP_BACKEND_URL

ARG VUE_APP_BACKEND_URL_API
ENV VUE_APP_BACKEND_URL_API $VUE_APP_BACKEND_URL_API

RUN npm run build

FROM nginx:1.25.2
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html