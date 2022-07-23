FROM node:16.15-alpine

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json

COPY ts-extension ts-extension
COPY domains/SharedKernel domains/SharedKernel
COPY domains/Community/Discussion domains/Community/Discussion

RUN npm i
RUN npm run build -w discussion

CMD npm run dev -w discussion