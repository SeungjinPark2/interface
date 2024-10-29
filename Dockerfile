FROM node:alpine as builder

WORKDIR /temp

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx

COPY --from=builder /temp/dist/ /usr/share/nginx/html/
COPY api.conf /etc/nginx/api.conf

# 런타임 시점에 BACKEND_URL 환경변수를 받아서 conf 를 완성시킴
ENTRYPOINT ["/bin/sh", "-c", "envsubst '$BACKEND_URL' < /etc/nginx/api.conf > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]