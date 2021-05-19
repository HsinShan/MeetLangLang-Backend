FROM node:10.17.0

WORKDIR /app

COPY ./app /app
COPY ./.env /app/.env

RUN npm install
