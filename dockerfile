FROM node:24-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:24-alpine

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]

