FROM node:16.15-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

COPY ts-extension ts-extension
COPY domains domains

RUN mkdir build
RUN chown node:node build

RUN mkdir dist
RUN chown node:node dist

RUN npm ci
# RUN npm run build -ws

# CMD npm run dev -ws