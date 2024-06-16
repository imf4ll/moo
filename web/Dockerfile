# Setup backend
FROM golang:1.22-alpine as backend
LABEL moo=builder

RUN apk add build-base

WORKDIR /backend

COPY backend/ .

RUN go build

# Setup frontend
FROM node:alpine as frontend
LABEL moo=builder

WORKDIR /frontend

COPY frontend/ .

RUN npm install --legacy-peer-deps && npm run build

# Setup final image
FROM alpine

RUN apk add openrc apache2 --no-cache ca-certificates

# Setup binary generation
WORKDIR /app/backend

COPY --from=backend /backend/backend .

# Setup webserver
WORKDIR /var/www/localhost/htdocs

COPY --from=frontend /frontend/dist .

RUN echo "ServerName localhost:80" >> /etc/apache2/httpd.conf

RUN rc-update add apache2

EXPOSE 3001
EXPOSE 80

CMD ["sh", "-c", "/app/backend/backend & /usr/sbin/httpd -D FOREGROUND"]
