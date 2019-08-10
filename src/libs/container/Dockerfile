FROM node:latest

RUN npm install -g fc-serve

COPY ./release /app

WORKDIR /app

RUN npm install -p

CMD ["fc-serve", "-c", "config.yaml"]
