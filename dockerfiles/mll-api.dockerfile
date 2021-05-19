FROM node:10.17.0

WORKDIR /app

COPY ./app /app

RUN npm install
